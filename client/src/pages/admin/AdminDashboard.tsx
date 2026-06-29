import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { MapPin, Hotel, Star } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalTours: 0,
    totalStays: 0,
    featuredStays: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [toursRes, staysRes] = await Promise.all([
          fetch('http://localhost:5000/api/v1/packages'),
          fetch('http://localhost:5000/api/v1/stays')
        ]);
        
        const toursJson = await toursRes.json();
        const staysJson = await staysRes.json();

        setStats({
          totalTours: toursJson.success && toursJson.data ? toursJson.data.length : 0,
          totalStays: staysJson.success && staysJson.data ? staysJson.data.length : 0,
          featuredStays: staysJson.success && staysJson.data ? staysJson.data.filter((s: any) => s.featured).length : 0,
        });
      } catch (err) {
        console.error('Failed to load stats', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout title="Dashboard Overview">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <MapPin size={24} />
          </div>
          <div>
            <div className="text-[13px] text-gray-500 font-medium">Total Tour Packages</div>
            <div className="text-[24px] font-bold text-[#003032]">{loading ? '...' : stats.totalTours}</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
            <Hotel size={24} />
          </div>
          <div>
            <div className="text-[13px] text-gray-500 font-medium">Total Stays</div>
            <div className="text-[24px] font-bold text-[#003032]">{loading ? '...' : stats.totalStays}</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
            <Star size={24} />
          </div>
          <div>
            <div className="text-[13px] text-gray-500 font-medium">Featured Stays</div>
            <div className="text-[24px] font-bold text-[#003032]">{loading ? '...' : stats.featuredStays}</div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
