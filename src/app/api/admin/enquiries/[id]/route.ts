import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { z } from 'zod';
import mongoose from 'mongoose';

const patchSchema = z.object({
  status: z.enum(['New', 'Contacted', 'Converted', 'Closed']),
});

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('travel_admin_token')?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: 'Invalid ID format' }, { status: 400 });
    }

    const body = await req.json();
    const result = patchSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ success: false, message: 'Invalid status' }, { status: 400 });
    }

    await dbConnect();
    const updated = await Enquiry.findByIdAndUpdate(
      id,
      { status: result.data.status },
      { returnDocument: 'after' }
    );

    if (!updated) {
      return NextResponse.json({ success: false, message: 'Enquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error) {
    console.error('Update Enquiry Error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
