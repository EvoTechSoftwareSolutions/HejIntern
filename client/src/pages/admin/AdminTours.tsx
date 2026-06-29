import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Plus, Edit2, Trash2, X, Upload } from 'lucide-react';
import { uploadFile } from '../../utils/uploadImage';

interface TourPackage {
  id: string;
  package_name: string;
  package_name_sv?: string;
  package_slug: string;
  short_description: string;
  short_description_sv?: string;
  full_description: string;
  full_description_sv?: string;
  duration_days: number;
  base_price: number;
  location: string;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  is_featured: boolean;
  status: string;
}

const AdminTours = () => {
  const [tours, setTours] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    package_name: '',
    package_name_sv: '',
    package_slug: '',
    short_description: '',
    short_description_sv: '',
    full_description: '',
    full_description_sv: '',
    duration_days: 1,
    base_price: 0,
    location: '',
    category: '',
    image: '',
    rating: 4.5,
    reviews: 0,
    is_featured: false,
  });

  const [uploading, setUploading] = useState(false);
  const token = localStorage.getItem('adminToken') || '';

  const fetchTours = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/packages');
      const json = await res.json();
      if (json.success) {
        setTours(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleOpenModal = (tour?: TourPackage) => {
    if (tour) {
      setEditingId(tour.id);
      setFormData({
        package_name: tour.package_name,
        package_name_sv: tour.package_name_sv || '',
        package_slug: tour.package_slug,
        short_description: tour.short_description || '',
        short_description_sv: tour.short_description_sv || '',
        full_description: tour.full_description || '',
        full_description_sv: tour.full_description_sv || '',
        duration_days: tour.duration_days,
        base_price: tour.base_price,
        location: tour.location,
        category: tour.category,
        image: tour.image || '',
        rating: tour.rating || 4.5,
        reviews: tour.reviews || 0,
        is_featured: tour.is_featured,
      });
    } else {
      setEditingId(null);
      setFormData({
        package_name: '',
        package_name_sv: '',
        package_slug: '',
        short_description: '',
        short_description_sv: '',
        full_description: '',
        full_description_sv: '',
        duration_days: 1,
        base_price: 0,
        location: '',
        category: '',
        image: '',
        rating: 4.5,
        reviews: 0,
        is_featured: false,
      });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        setUploading(true);
        const url = await uploadFile(file, token);
        setFormData((prev) => ({ ...prev, image: url }));
      } catch (err) {
        alert('Image upload failed');
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId
        ? `http://localhost:5000/api/v1/packages/${editingId}`
        : 'http://localhost:5000/api/v1/packages';
      
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (json.success) {
        fetchTours();
        handleCloseModal();
      } else {
        alert(json.message || 'Error saving package');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this tour?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/v1/packages/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      if (json.success) {
        fetchTours();
      } else {
        alert('Error deleting package');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout title="Tour Packages">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 flex justify-between items-center border-b border-gray-100">
          <h2 className="text-[15px] font-bold text-[#003032]">All Tours</h2>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-[#01888E] text-white px-4 py-2 rounded-lg text-[13px] font-bold hover:bg-[#006d6d] transition-colors"
          >
            <Plus size={16} />
            Add New Tour
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-[12px] text-gray-500 uppercase tracking-wider">
                <th className="px-5 py-3 font-medium">Image</th>
                <th className="px-5 py-3 font-medium">Tour Name</th>
                <th className="px-5 py-3 font-medium">Location</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Price</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-10">Loading tours...</td>
                </tr>
              ) : tours.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10">No tours found.</td>
                </tr>
              ) : (
                tours.map((tour) => (
                  <tr key={tour.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-5 py-3">
                      {tour.image?.startsWith('http') ? (
                        <img src={tour.image} alt="tour" className="w-12 h-12 rounded object-cover" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-[10px] text-gray-500">Local</div>
                      )}
                    </td>
                    <td className="px-5 py-3 font-medium text-[#003032]">{tour.package_name}</td>
                    <td className="px-5 py-3">{tour.location}</td>
                    <td className="px-5 py-3">
                      <span className="bg-[#01888E]/10 text-[#01888E] px-2 py-1 rounded text-[11px] font-semibold">
                        {tour.category}
                      </span>
                    </td>
                    <td className="px-5 py-3">${tour.base_price}</td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(tour)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(tour.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h2 className="text-[16px] font-bold text-[#003032]">
                {editingId ? 'Edit Tour Package' : 'Add New Tour'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">Package Name (English)</label>
                  <input
                    type="text"
                    required
                    value={formData.package_name}
                    onChange={(e) => setFormData({ ...formData, package_name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#01888E]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">Package Name (Swedish)</label>
                  <input
                    type="text"
                    value={formData.package_name_sv}
                    onChange={(e) => setFormData({ ...formData, package_name_sv: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#01888E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-gray-700 mb-1">Slug</label>
                <input
                  type="text"
                  required
                  value={formData.package_slug}
                  onChange={(e) => setFormData({ ...formData, package_slug: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#01888E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#01888E]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">Category</label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#01888E]"
                  >
                    <option value="">Select Category</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Nature">Nature</option>
                    <option value="Relax">Relax</option>
                    <option value="Heritage">Heritage</option>
                    <option value="Wildlife">Wildlife</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.duration_days}
                    onChange={(e) => setFormData({ ...formData, duration_days: parseInt(e.target.value) })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#01888E]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">Base Price ($)</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.base_price}
                    onChange={(e) => setFormData({ ...formData, base_price: parseFloat(e.target.value) })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#01888E]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    required
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#01888E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">Short Description (English)</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.short_description}
                    onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#01888E]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">Short Description (Swedish)</label>
                  <textarea
                    rows={2}
                    value={formData.short_description_sv}
                    onChange={(e) => setFormData({ ...formData, short_description_sv: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#01888E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">Full Description (English)</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.full_description}
                    onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#01888E]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">Full Description (Swedish)</label>
                  <textarea
                    rows={4}
                    value={formData.full_description_sv}
                    onChange={(e) => setFormData({ ...formData, full_description_sv: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#01888E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-medium text-gray-700 mb-1">Cover Image</label>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <button type="button" className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-[13px] hover:bg-gray-200 transition-colors">
                      <Upload size={16} />
                      {uploading ? 'Uploading...' : 'Upload Image'}
                    </button>
                  </div>
                  {formData.image && (
                    <div className="text-[12px] text-green-600 font-medium">Image selected / uploaded</div>
                  )}
                </div>
                {formData.image?.startsWith('http') && (
                  <img src={formData.image} alt="Preview" className="mt-2 h-20 rounded object-cover" />
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-[13px] font-medium text-gray-600 hover:bg-gray-50 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-2 text-[13px] font-bold bg-[#01888E] text-white rounded-lg hover:bg-[#006d6d] disabled:opacity-50"
                >
                  {editingId ? 'Update Tour' : 'Create Tour'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminTours;
