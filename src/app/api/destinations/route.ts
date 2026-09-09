import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Destination from '@/models/Destination';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { z } from 'zod';

const destSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  country: z.string().min(1),
  image: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  category: z.enum(['india', 'international']),
});

// PUBLIC: GET all destinations
export async function GET() {
  try {
    await dbConnect();
    const destinations = await Destination.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: destinations }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

// ADMIN ONLY: Create destination
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('travel_admin_token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const result = destSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ success: false, message: 'Validation failed' }, { status: 400 });
    }

    await dbConnect();
    const existing = await Destination.findOne({ id: result.data.id });
    if (existing) {
      return NextResponse.json({ success: false, message: 'Destination ID already exists' }, { status: 400 });
    }

    const newDest = await Destination.create(result.data);
    return NextResponse.json({ success: true, data: newDest }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
