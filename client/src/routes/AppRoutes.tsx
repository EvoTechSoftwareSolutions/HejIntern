import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import About from "../pages/About";

export default function App() {
  return (
        <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="sv" element={<HomeSV />} />
        <Route path="about" element={<About />} />
      </Route>
  );
}