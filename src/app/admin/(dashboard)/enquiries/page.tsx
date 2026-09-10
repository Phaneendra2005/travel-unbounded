'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import AdminLoader from '@/components/admin/AdminLoader';

type Enquiry = {
  _id: string;
  fullName: string;
  email: string;
  contactNumber: string;
  dateOfTravel: string;
  numberOfPeople: number;
  hotelCategory: string;
  status?: string;
  createdAt: string;
};

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    
    const fetchEnquiries = async () => {
      try {
        const res = await fetch('/api/admin/enquiries');
        if (res.status === 401) {
          router.push('/admin/login');
          return;
        }
        const data = await res.json();
        if (data.success && isMounted) {
          setEnquiries(data.data);
        }
      } catch {
        if (isMounted) toast.error('Failed to load enquiries');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchEnquiries();
    
    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/enquiry/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Status updated');
        setEnquiries((prev) => prev.map((e) => e._id === id ? { ...e, status: newStatus } : e));
      } else {
        toast.error(data.message || 'Failed to update status');
      }
    } catch {
      toast.error('Failed to update status');
    }
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch = e.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          e.email.toLowerCase().includes(searchTerm.toLowerCase());
    const eStatus = e.status || 'New';
    const matchesStatus = statusFilter === 'All' || eStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <AdminLoader message="Loading enquiries..." />;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Enquiries</h1>
      
      <div className="bg-white shadow rounded-lg p-6 mb-6 flex flex-col sm:flex-row gap-4">
        <input 
          type="text" 
          placeholder="Search by name or email..." 
          className="flex-1 px-3 py-2 border border-gray-300 bg-white text-gray-900 placeholder-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          className="px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Converted">Converted</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name & Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Travel Info</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEnquiries.map((enquiry) => (
              <tr key={enquiry._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(enquiry.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{enquiry.fullName}</div>
                  <div className="text-sm text-gray-500">{enquiry.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {enquiry.contactNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(enquiry.dateOfTravel).toLocaleDateString()} <br />
                  {enquiry.numberOfPeople} people, {enquiry.hotelCategory}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <select
                    className="mt-1 block w-full py-1 px-2 border border-gray-300 bg-white text-gray-900 font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={enquiry.status || 'New'}
                    onChange={(e) => handleStatusChange(enquiry._id, e.target.value)}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Converted">Converted</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>
              </tr>
            ))}
            {filteredEnquiries.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  No enquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
