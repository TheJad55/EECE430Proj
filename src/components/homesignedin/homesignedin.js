import React from "react";
import Navbar3 from "../navbar/Navbar3";
import PlayerProfile from "../usableComponents/PlayerProfile";
import PlayerTeam from "../usableComponents/PlayerTeam";
import PlayerStats from "../usableComponents/PlayerStats";
import Calendar3 from "../calendar/Calendar3.jsx";

const Homesignedin = () => {
  return (
    <div className="relative">
      <Navbar3 />
      <div className="max-w-screen-xl mx-auto">
        <PlayerProfile />
        <PlayerTeam />
        <h1 className="text-6xl font-bold text-white mt-8">
          Your <span className="text-designColor capitalize">Stats</span>
        </h1>{" "}
        <div className="m-8">
          <PlayerStats />
          <div className="m-8">
            <Calendar3 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homesignedin;
