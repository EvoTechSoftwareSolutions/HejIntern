import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.tsx';
import HomeSV from './pages/HomeSV.tsx';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTours from './pages/admin/AdminTours';
import AdminStays from './pages/admin/AdminStays';
import AdminLayout from './components/admin/AdminLayout';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';

function AppShell() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex min-h-screen flex-col">
      {!isAdminRoute ? <Navbar /> : null}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sv" element={<HomeSV />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/tours"
            element={
              <AdminProtectedRoute>
                <AdminTours />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/stays"
            element={
              <AdminProtectedRoute>
                <AdminStays />
              </AdminProtectedRoute>
            }
          />

        </Routes>
      </main>
      {!isAdminRoute ? <Footer /> : null}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
