'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import AdminLoader from '@/components/admin/AdminLoader';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

type ChartData = {
  statusBreakdown: { name: string; value: number }[];
  enquiriesOverTime: { date: string; count: number }[];
};

export default function AnalyticsPage() {
  const [data, setData] = useState<ChartData | null>(null);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch('/api/analytics/summary');
        const resData = await res.json();
        if (resData.success) {
          setData(resData.data);
        } else {
          toast.error(resData.message || 'Failed to load analytics');
        }
      } catch {
        toast.error('Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <AdminLoader message="Loading analytics..." />;
  if (!data) return <div className="p-4">No data available</div>;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Enquiries Over Time */}
        <div className="bg-white shadow rounded-lg p-6 min-w-0">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Enquiries Over Time (Last 30 Days)</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.enquiriesOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="count" fill="#3b82f6" name="Enquiries" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="bg-white shadow rounded-lg p-6 min-w-0">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Enquiries by Status</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.statusBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.statusBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
