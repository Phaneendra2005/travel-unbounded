import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';
import Destination from '@/models/Destination';
import { MessageSquare, MapPin, BarChart3, TrendingUp } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  await dbConnect();

  const totalEnquiries = await Enquiry.countDocuments();
  const newEnquiries = await Enquiry.countDocuments({ status: 'New' });
  const convertedEnquiries = await Enquiry.countDocuments({ status: 'Converted' });
  const totalDestinations = await Destination.countDocuments();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Admin Overview</h1>
        <p className="text-gray-600 mt-1">Manage enquiries, destinations and business insights.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center text-gray-500 mb-2">
            <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
            <span className="text-sm font-medium">Total Enquiries</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{totalEnquiries}</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center text-gray-500 mb-2">
            <TrendingUp className="h-5 w-5 mr-2 text-yellow-500" />
            <span className="text-sm font-medium">New Enquiries</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{newEnquiries}</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center text-gray-500 mb-2">
            <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
            <span className="text-sm font-medium">Converted Enquiries</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{convertedEnquiries}</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center text-gray-500 mb-2">
            <MapPin className="h-5 w-5 mr-2 text-blue-600" />
            <span className="text-sm font-medium">Total Destinations</span>
          </div>
          <div className="text-3xl font-bold text-gray-900">{totalDestinations}</div>
        </div>
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link 
          href="/admin/enquiries" 
          className="flex items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 hover:border-blue-300 transition-colors"
        >
          <MessageSquare className="h-5 w-5 mr-2 text-gray-500" />
          <span className="font-medium text-gray-700">Manage Enquiries</span>
        </Link>
        <Link 
          href="/admin/destinations" 
          className="flex items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 hover:border-blue-300 transition-colors"
        >
          <MapPin className="h-5 w-5 mr-2 text-gray-500" />
          <span className="font-medium text-gray-700">Manage Destinations</span>
        </Link>
        <Link 
          href="/admin/analytics" 
          className="flex items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 hover:border-blue-300 transition-colors"
        >
          <BarChart3 className="h-5 w-5 mr-2 text-gray-500" />
          <span className="font-medium text-gray-700">View Analytics</span>
        </Link>
      </div>
    </div>
  );
}
