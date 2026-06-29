import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success && data.user.role === 'admin') {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        navigate('/admin');
      } else {
        setError(data.message || 'Access denied: Admin only');
      }
    } catch (err) {
      setError('Network error. Check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F6FA] p-4" style={{ fontFamily: 'Inter' }}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-[#003032] p-8 text-center">
          <div className="w-12 h-12 bg-[#01888E] rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">H</span>
          </div>
          <h1 className="text-[20px] font-bold text-white">HejCeylon Admin</h1>
          <p className="text-white/60 text-[13px] mt-2">Log in to access the dashboard</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-[13px] font-medium text-center">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-[13px] font-semibold text-[#003032] mb-1.5">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#01888E] focus:ring-1 focus:ring-[#01888E] transition-all"
              placeholder="admin@hejceylon.com"
            />
          </div>
          
          <div>
            <label className="block text-[13px] font-semibold text-[#003032] mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#01888E] focus:ring-1 focus:ring-[#01888E] transition-all"
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#01888E] hover:bg-[#006D6D] text-white font-bold py-3 rounded-lg transition-colors text-[14px] shadow-[0_4px_14px_rgba(1,136,142,0.3)] disabled:opacity-70 mt-2"
          >
            {loading ? 'Authenticating...' : 'Log In to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
