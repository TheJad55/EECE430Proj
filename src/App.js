import React from "react";
import Footer from "./components/footer/Footer";
import FooterBottom from "./components/footer/FooterBottom";
import Navbar from "./components/navbar/Navbar";
import Homep from "./components/home/Homep";
import Login from "./components/login/Login";
import Register from "./components/register/Registration";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="w-full h-auto bg-bodyColor text-lightText ">
      <Routes>
        <Route path="/" element={<Homep />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
      <FooterBottom />
    </div>
  );
}

export default App;
