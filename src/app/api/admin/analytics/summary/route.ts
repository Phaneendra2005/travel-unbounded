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

    // 1. Status Breakdown
    const statusBreakdown = await Enquiry.aggregate([
      {
        $group: {
          _id: { $ifNull: ['$status', 'New'] },
          count: { $sum: 1 }
        }
      }
    ]);

    const formattedStatusBreakdown = statusBreakdown.map(item => ({
      name: item._id,
      value: item.count
    }));

    // 2. Enquiries Over Time (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const enquiriesOverTime = await Enquiry.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 } // Sort chronologically
      }
    ]);

    const formattedTimeData = enquiriesOverTime.map(item => ({
      date: item._id,
      count: item.count
    }));

    return NextResponse.json({ 
      success: true, 
      data: {
        statusBreakdown: formattedStatusBreakdown,
        enquiriesOverTime: formattedTimeData
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Analytics Fetch Error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
