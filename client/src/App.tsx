import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.tsx';
import HomeSV from './pages/HomeSV.tsx';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import FooterSV from './components/common/FooterSV';

function AppFooter() {
  const { pathname } = useLocation();
  return pathname.startsWith('/sv') ? <FooterSV /> : <Footer />;
}

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sv" element={<HomeSV />} />
        </Routes>
        </main>
        <AppFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
