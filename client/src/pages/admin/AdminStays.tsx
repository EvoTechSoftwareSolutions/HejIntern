import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Plus, Edit2, Trash2, X, Upload } from 'lucide-react';
import { uploadFile } from '../../utils/uploadImage';

interface StayItem {
  id: string;
  name: string;
  name_sv?: string;
  location: string;
  location_sv?: string;
  rating: number;
  image: string;
  featured: boolean;
}

const AdminStays = () => {
  const [stays, setStays] = useState<StayItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    name_sv: '',
    location: '',
    location_sv: '',
    rating: 4.5,
    image: '',
    featured: false,
  });

  const [uploading, setUploading] = useState(false);
  const token = localStorage.getItem('adminToken') || '';

  const fetchStays = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/v1/stays');
      const json = await res.json();
      if (json.success) {
        setStays(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStays();
  }, []);

  const handleOpenModal = (stay?: StayItem) => {
    if (stay) {
      setEditingId(stay.id);
      setFormData({
        name: stay.name,
        name_sv: stay.name_sv || '',
        location: stay.location,
        location_sv: stay.location_sv || '',
        rating: stay.rating || 4.5,
        image: stay.image || '',
        featured: stay.featured || false,
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        name_sv: '',
        location: '',
        location_sv: '',
        rating: 4.5,
        image: '',
        featured: false,
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
        ? `http://localhost:5000/api/v1/stays/${editingId}`
        : 'http://localhost:5000/api/v1/stays';
      
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
        fetchStays();
        handleCloseModal();
      } else {
        alert(json.message || 'Error saving stay');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this stay?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/v1/stays/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      if (json.success) {
        fetchStays();
      } else {
        alert('Error deleting stay');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout title="Stays">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 flex justify-between items-center border-b border-gray-100">
          <h2 className="text-[15px] font-bold text-[#003032]">All Stays</h2>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-[#01888E] text-white px-4 py-2 rounded-lg text-[13px] font-bold hover:bg-[#006d6d] transition-colors"
          >
            <Plus size={16} />
            Add New Stay
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-[12px] text-gray-500 uppercase tracking-wider">
                <th className="px-5 py-3 font-medium">Image</th>
                <th className="px-5 py-3 font-medium">Stay Name</th>
                <th className="px-5 py-3 font-medium">Location</th>
                <th className="px-5 py-3 font-medium">Rating</th>
                <th className="px-5 py-3 font-medium">Featured</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-10">Loading stays...</td>
                </tr>
              ) : stays.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10">No stays found.</td>
                </tr>
              ) : (
                stays.map((stay) => (
                  <tr key={stay.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-5 py-3">
                      {stay.image?.startsWith('http') ? (
                        <img src={stay.image} alt="stay" className="w-12 h-12 rounded object-cover" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-[10px] text-gray-500">Local</div>
                      )}
                    </td>
                    <td className="px-5 py-3 font-medium text-[#003032]">{stay.name}</td>
                    <td className="px-5 py-3">{stay.location}</td>
                    <td className="px-5 py-3">{stay.rating}</td>
                    <td className="px-5 py-3">
                      {stay.featured ? (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-[11px] font-bold">Yes</span>
                      ) : (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-[11px] font-bold">No</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenModal(stay)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(stay.id)}
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

      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h2 className="text-[16px] font-bold text-[#003032]">
                {editingId ? 'Edit Stay' : 'Add New Stay'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">Stay Name (English)</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#01888E]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">Stay Name (Swedish)</label>
                  <input
                    type="text"
                    value={formData.name_sv}
                    onChange={(e) => setFormData({ ...formData, name_sv: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#01888E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">Location (English)</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#01888E]"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium text-gray-700 mb-1">Location (Swedish)</label>
                  <input
                    type="text"
                    value={formData.location_sv}
                    onChange={(e) => setFormData({ ...formData, location_sv: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#01888E]"
                  />
                </div>
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

              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded text-[#01888E] focus:ring-[#01888E] w-4 h-4"
                />
                <label htmlFor="featured" className="text-[13px] text-gray-700 font-medium cursor-pointer">
                  Featured Stay (shows on homepage)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
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
                  {editingId ? 'Update Stay' : 'Create Stay'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminStays;
