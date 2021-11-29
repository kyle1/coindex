import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Asset from "./pages/Asset";
import Overview from "./pages/Overview";
import AssetTags from "./pages/AssetTags";
import AssetsMaintenance from "./pages/admin/AssetsMaintenance";

function App() {
  return (
    <BrowserRouter>
      <NavBar loggedIn={false} onLoginClick={() => {}} onLogoutClick={() => {}} />
      <Routes>
        {/* <Route path="/" element={<Overview />} /> */}
        <Route path="/" element={<Asset />} />
        <Route path="/tags" element={<AssetTags />} />
        <Route path="/admin/assets" element={<AssetsMaintenance />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
