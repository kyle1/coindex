import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AssetTagsMaintenance from "./pages/admin/tags/TagsMaintenance";
import AssetsMaintenance from "./pages/admin/assets/AssetsMaintenance";
import Coin from "./pages/coin/Coin";
import Coins from "./pages/coins/Coins";
import Compare from "./pages/compare/Compare";
import Dashboard from "./pages/dashboard/Dashboard";
import Dyor from "./pages/admin/dyor/Dyor";
import EventsMaintenance from "./pages/events/EventsMaintenance";
import Portfolio from "./pages/portfolio/Portfolio";
import ResourcesMaintenance from "./pages/admin/resources/ResourcesMaintenance";
import SectionsMaintenance from "./pages/admin/sections/SectionsMaintenance";
import Test from "./pages/Test";

const App: React.FC = () => (
  <BrowserRouter>
    <NavBar loggedIn={false} onLoginClick={() => {}} onLogoutClick={() => {}} />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/coins" element={<Coins />} />
      <Route path="/coins/:id" element={<Coin />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/events" element={<EventsMaintenance />} />
      <Route path="/compare" element={<Compare />} />
      <Route path="/admin/assets" element={<AssetsMaintenance />} />
      <Route path="/admin/resources" element={<ResourcesMaintenance />} />
      <Route path="/admin/sections" element={<SectionsMaintenance />} />
      <Route path="/admin/tags" element={<AssetTagsMaintenance />} />
      <Route path="/admin/dyor" element={<Dyor />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  </BrowserRouter>
);

export default App;
