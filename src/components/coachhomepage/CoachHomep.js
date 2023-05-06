import React from "react";
import Navbar4 from "../navbar/Navbar4";
import CoachProfile from "../usableComponents/CoachProfile";
import TeamStats from "../coachComponents/TeamStats";
import CoachPay from "../usableComponents/CoachPay";
import ContactCoach from "../contact/ContactCoach";
import Calendar from "../calendar/Calendar.jsx";
import Chat from "../GPT4/GPT4";

const CoachHomep = () => {
  return (
    <div>
      <Navbar4 />
      <div className="max-w-screen-xl mx-auto">
        <div className="w-full py-20 border-b-[1px] border-b-black">
          <CoachProfile />
        </div>
        <h1 className="text-6xl font-bold text-white mt-8">
          Team <span className="text-designColor capitalize">Stats</span>
        </h1>
        <div className="w-full py-20 border-b-[1px] border-b-black">
          <div className="m-8">
            <div className="m-8"></div>
          </div>
          <div className="w-full py-20 border-b-[1px] border-b-black">
            <TeamStats />
          </div>

          <h1 className="text-6xl font-bold text-white mt-20">
            Add Player{" "}
            <span className="text-designColor capitalize">Stats</span>
          </h1>
          <ContactCoach />
          <h1 className="text-6xl font-bold text-white mt-20">
            Player{" "}
            <span className="text-designColor capitalize">Management</span>
          </h1>
          <CoachPay />
          <Calendar />
          <h1 className="text-6xl font-bold text-white mt-20 mb-20">
            Your{" "}
            <span className="text-designColor capitalize">AI Companion</span>
          </h1>
          <Chat></Chat>
        </div>
      </div>
    </div>
  );
};

export default CoachHomep;
