import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AssetTagsMaintenance from "./pages/admin/AssetTagsMaintenance";
import AssetsMaintenance from "./pages/admin/AssetsMaintenance";
import Asset from "./pages/Asset";
import Compare from "./pages/Compare";
import Overview from "./pages/Overview";

function App() {
  return (
    <BrowserRouter>
      <NavBar loggedIn={false} onLoginClick={() => {}} onLogoutClick={() => {}} />
      <Routes>
        {/* <Route path="/" element={<Overview />} /> */}
        <Route path="/" element={<Asset />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/admin/tags" element={<AssetTagsMaintenance />} />
        <Route path="/admin/assets" element={<AssetsMaintenance />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
