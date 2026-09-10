import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Destination from '@/models/Destination';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import mongoose from 'mongoose';

// PUBLIC: GET single destination
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: 'Invalid ID format' }, { status: 400 });
    }

    await dbConnect();
    const destination = await Destination.findById(id);

    if (!destination) {
      return NextResponse.json({ success: false, message: 'Destination not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: destination }, { status: 200 });
  } catch (error) {
    console.error('Fetch Destination Error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

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
    
    // Using a simpler update pattern, only updating fields that are present
    const updateData: Record<string, unknown> = {};
    const allowedFields = ['name', 'country', 'image', 'description', 'price', 'category', 'id'];
    
    for (const key of allowedFields) {
      if (body[key] !== undefined) {
        updateData[key] = body[key];
      }
    }

    await dbConnect();
    const updated = await Destination.findByIdAndUpdate(id, updateData, { returnDocument: 'after' });

    if (!updated) {
      return NextResponse.json({ success: false, message: 'Destination not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error) {
    console.error('Update Destination Error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
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

    await dbConnect();
    const deleted = await Destination.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ success: false, message: 'Destination not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Destination deleted' }, { status: 200 });
  } catch (error) {
    console.error('Delete Destination Error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
