import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AssetTagsMaintenance from "./pages/admin/AssetTagsMaintenance";
import AssetsMaintenance from "./pages/assets/AssetsMaintenance";
import Asset from "./pages/Asset";
import Compare from "./pages/Compare";
import Dash from "./pages/dash/Dash";
import Events from "./pages/events/Events";
import Home from "./pages/Home";
import Movers from "./pages/movers/Movers";
import Overview from "./pages/Overview";
import Portfolio from "./pages/portfolio/Portfolio";

const App: React.FC = () => (
  <BrowserRouter>
    <NavBar loggedIn={false} onLoginClick={() => {}} onLogoutClick={() => {}} />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dash" element={<Dash />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/movers" element={<Movers />} />
      <Route path="/events" element={<Events />} />
      <Route path="/compare" element={<Compare />} />
      <Route path="/admin/tags" element={<AssetTagsMaintenance />} />
      <Route path="/admin/assets" element={<AssetsMaintenance />} />
      <Route path="/test" element={<Asset />} />
    </Routes>
  </BrowserRouter>
);

export default App;
