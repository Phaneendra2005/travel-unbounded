import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';
import { z } from 'zod';

const enquirySchema = z.object({
  fullName: z.string().min(1, 'Full name is required').trim(),
  countryCode: z.string().min(1, 'Country code is required'),
  contactNumber: z.string().min(5, 'Valid contact number is required'),
  email: z.string().email('Invalid email address'),
  dateOfTravel: z.string().refine((dateString) => {
    const travelDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
    return travelDate >= today;
  }, { message: 'Date of travel must be in the future' }),
  numberOfPeople: z.number().int().min(1, 'At least 1 person is required'),
  hotelCategory: z.enum(['Standard', 'Deluxe', 'Luxury']),
  numberOfChildren: z.number().int().min(0).optional().default(0),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Validate request body against schema
    const validationResult = enquirySchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // 2. Connect to database
    await dbConnect();

    // 3. Save to database
    const newEnquiry = await Enquiry.create(validationResult.data);

    // 4. Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Our travel expert will contact you within 24 hours.',
        data: {
          id: newEnquiry._id,
          createdAt: newEnquiry.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Submission Error:', error);
    
    // Check for mongoose validation error as fallback
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, message: 'Database validation failed', details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Internal server error while submitting enquiry.' },
      { status: 500 }
    );
  }
}
