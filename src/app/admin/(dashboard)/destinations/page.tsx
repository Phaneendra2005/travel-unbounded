'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import AdminLoader from '@/components/admin/AdminLoader';
import { Pencil, Trash2 } from 'lucide-react';

type Destination = {
  _id: string;
  id: string;
  name: string;
  country: string;
  image: string;
  description: string;
  price: number;
  category: 'india' | 'international';
};

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDest, setEditingDest] = useState<Partial<Destination> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reloadDestinations = async () => {
    try {
      const res = await fetch('/api/destinations');
      const data = await res.json();
      if (data.success) {
        setDestinations(data.data);
      }
    } catch {
      toast.error('Failed to reload destinations');
    }
  };

  useEffect(() => {
    let isMounted = true;
    const fetchInitial = async () => {
      try {
        const res = await fetch('/api/destinations');
        const data = await res.json();
        if (data.success && isMounted) {
          setDestinations(data.data);
        }
      } catch {
        if (isMounted) toast.error('Failed to load destinations');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchInitial();
    return () => { isMounted = false; };
  }, []);

  const handleSeed = async () => {
    try {
      const res = await fetch('/api/destinations/seed', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        reloadDestinations();
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error('Failed to seed destinations');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDest) return;

    const isNew = !editingDest._id;
    const url = isNew ? '/api/destinations' : `/api/destinations/${editingDest._id}`;
    const method = isNew ? 'POST' : 'PATCH';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingDest),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(isNew ? 'Destination created' : 'Destination updated');
        setIsModalOpen(false);
        reloadDestinations();
      } else {
        toast.error(data.message || 'Failed to save');
      }
    } catch {
      toast.error('Error saving destination');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this destination?')) return;
    try {
      const res = await fetch(`/api/destinations/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('Destination deleted');
        reloadDestinations();
      } else {
        toast.error(data.message || 'Failed to delete');
      }
    } catch {
      toast.error('Error deleting destination');
    }
  };

  const openModal = (dest?: Destination) => {
    if (dest) {
      setEditingDest(dest);
    } else {
      setEditingDest({ category: 'india', price: 0 });
    }
    setIsModalOpen(true);
  };

  if (loading) return <AdminLoader message="Loading destinations..." />;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Destinations</h1>
        <div className="flex flex-wrap gap-2">
          <button onClick={handleSeed} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
            Seed Data
          </button>
          <button onClick={() => openModal()} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Add Destination
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name & Country</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category & Price</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {destinations.map((dest) => (
              <tr key={dest._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={dest.image} alt={dest.name} className="h-12 w-16 object-cover rounded" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{dest.name}</div>
                  <div className="text-sm text-gray-500">{dest.country}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 capitalize">{dest.category}</div>
                  <div className="text-sm text-gray-500">₹{dest.price.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex flex-wrap items-center justify-end gap-2">
                    <button 
                      onClick={() => openModal(dest)} 
                      className="inline-flex items-center px-3 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      aria-label={`Edit ${dest.name}`}
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(dest._id)} 
                      className="inline-flex items-center px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                      aria-label={`Delete ${dest.name}`}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {destinations.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  No destinations found. Click Seed Data to load the defaults.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-full flex flex-col">
            <form onSubmit={handleSave} className="flex flex-col overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 shrink-0">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingDest?._id ? 'Edit Destination' : 'Add Destination'}
                </h3>
              </div>
              <div className="p-6 space-y-4 overflow-y-auto">
                <div>
                  <label className="block text-sm font-medium text-gray-700">ID / Slug</label>
                  <input type="text" required className="mt-1 block w-full border border-gray-300 bg-white text-gray-900 placeholder-gray-500 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={editingDest?.id || ''} onChange={(e) => setEditingDest({...editingDest, id: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" required className="mt-1 block w-full border border-gray-300 bg-white text-gray-900 placeholder-gray-500 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={editingDest?.name || ''} onChange={(e) => setEditingDest({...editingDest, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Country</label>
                  <input type="text" required className="mt-1 block w-full border border-gray-300 bg-white text-gray-900 placeholder-gray-500 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={editingDest?.country || ''} onChange={(e) => setEditingDest({...editingDest, country: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Image URL</label>
                  <input type="text" required className="mt-1 block w-full border border-gray-300 bg-white text-gray-900 placeholder-gray-500 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={editingDest?.image || ''} onChange={(e) => setEditingDest({...editingDest, image: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea required rows={3} className="mt-1 block w-full border border-gray-300 bg-white text-gray-900 placeholder-gray-500 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={editingDest?.description || ''} onChange={(e) => setEditingDest({...editingDest, description: e.target.value})} />
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input type="number" required min="0" className="mt-1 block w-full border border-gray-300 bg-white text-gray-900 placeholder-gray-500 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={editingDest?.price || 0} onChange={(e) => setEditingDest({...editingDest, price: Number(e.target.value)})} />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select className="mt-1 block w-full border border-gray-300 bg-white text-gray-900 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={editingDest?.category || 'india'} onChange={(e) => setEditingDest({...editingDest, category: e.target.value as 'india' | 'international'})}>
                      <option value="india">India</option>
                      <option value="international">International</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3 shrink-0">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
