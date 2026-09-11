import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SavedItinerary from '@/models/SavedItinerary';
import { z } from 'zod';

const daySchema = z.object({
  day: z.number().int().min(1),
  title: z.string().min(1),
  activities: z.array(z.string().min(1)),
  highlight: z.string().optional(),
});

const itinerarySchema = z.object({
  title: z.string().min(1),
  destination: z.string().min(1),
  duration: z.number().int().min(1),
  days: z.array(daySchema).min(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = itinerarySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid itinerary data', errors: result.error.format() },
        { status: 400 }
      );
    }

    await dbConnect();

    const newSavedItinerary = await SavedItinerary.create(result.data);

    return NextResponse.json(
      { success: true, message: 'Itinerary saved successfully', data: newSavedItinerary },
      { status: 201 }
    );
  } catch (error) {
    console.error('Save Itinerary Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
