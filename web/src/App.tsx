import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Overview from "./pages/Overview";

function App() {
  return (
    <BrowserRouter>
      <NavBar loggedIn={false} onLoginClick={() => {}} onLogoutClick={() => {}} />
      <Routes>
        <Route path="/" element={<Overview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
