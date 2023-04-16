import React from "react";
import Footer from "./components/footer/Footer";
import FooterBottom from "./components/footer/FooterBottom";
import Homep from "./components/home/Homep";
import Login from "./components/login/Login";
import Register from "./components/register/Registration";
import Homesignedin from "./components/homesignedin/homesignedin";
import Calendar2 from "./components/calendar/Calendar2";
import CoachHomep from "./components/coachhomepage/CoachHomep";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="w-full h-auto bg-bodyColor text-lightText ">
      <Routes>
        <Route path="/" element={<Homep />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homesignedin" element={<Homesignedin />} />
        <Route path="/calendar" element={<Calendar2 />} />
        <Route path="/coachhomepage" element={<CoachHomep />} />
      </Routes>
      <Footer />
      <FooterBottom />
    </div>
  );
}

export default App;
