import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AssetTagsMaintenance from "./pages/admin/tags/TagsMaintenance";
import AssetsMaintenance from "./pages/admin/assets/AssetsMaintenance";
import Coin from "./pages/coin/Coin";
import Coins from "./pages/coins/Coins";
import Compare from "./pages/compare/Compare";
import Dyor from "./pages/admin/dyor/Dyor";
import Events from "./pages/events/EventsMaintenance";
import Home from "./pages/Home";
import Portfolio from "./pages/portfolio/Portfolio";
import Resources from "./pages/resources/Resources";
import SectionsMaintenance from "./pages/admin/sections/SectionsMaintenance";
import Test from "./pages/Test";
import EventsMaintenance from "./pages/events/EventsMaintenance";

const App: React.FC = () => (
  <BrowserRouter>
    <NavBar loggedIn={false} onLoginClick={() => {}} onLogoutClick={() => {}} />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/coins" element={<Coins />} />
      <Route path="/coins/:id" element={<Coin />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/events" element={<EventsMaintenance />} />
      <Route path="/compare" element={<Compare />} />
      <Route path="/admin/sections" element={<SectionsMaintenance />} />
      <Route path="/admin/tags" element={<AssetTagsMaintenance />} />
      <Route path="/admin/assets" element={<AssetsMaintenance />} />
      <Route path="/admin/dyor" element={<Dyor />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  </BrowserRouter>
);

export default App;
