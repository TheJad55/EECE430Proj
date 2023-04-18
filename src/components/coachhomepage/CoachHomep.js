import React from "react";
import BasketballTeamTable from "../usableComponents/TeamTable";
import Navbar2 from "../navbar/Navbar2";
import CoachProfile from "../usableComponents/CoachProfile";
import TeamStats from "../coachComponents/TeamStats";
const coach = {
  imageUrl: "path/to/js.jpg",
  name: "John Smith",
  age: 45,
  team: "Boston Celtics",
  position: "Head Coach",
  yearsOfExperience: 20,
  education: "Bachelor's degree in Sports Management",
  championships: 2,
  teamColor: "#2F5233",
};

const CoachHomep = () => {
  return (
    <div>
      <Navbar2 />
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-6xl font-bold text-white text-center mb-2 mt-10">
          Welcome to your profile
        </h1>
        <h2 className="text-6xl font-bold text-designColor capitalize text-center">
          {coach.name}
        </h2>
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
        </div>
      </div>
    </div>
  );
};

export default CoachHomep;
