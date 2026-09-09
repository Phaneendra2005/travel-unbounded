import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Destination from '@/models/Destination';
import { destinations as staticDestinations } from '@/data/destinations';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('travel_admin_token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    let seededCount = 0;

    for (const dest of staticDestinations) {
      // Idempotent upsert based on the unique 'id' field
      const result = await Destination.updateOne(
        { id: dest.id },
        { $setOnInsert: dest },
        { upsert: true }
      );
      if (result.upsertedCount > 0) {
        seededCount++;
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Seed complete. Inserted ${seededCount} new destinations.` 
    }, { status: 200 });

  } catch (error) {
    console.error('Seed Destinations Error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
