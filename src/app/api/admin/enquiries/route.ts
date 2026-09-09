import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('travel_admin_token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: enquiries }, { status: 200 });
  } catch (error) {
    console.error('Fetch Enquiries Error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
