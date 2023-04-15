import React from "react";
import Navbar2 from "../navbar/Navbar2";
import PlayerProfile from "../usableComponents/PlayerProfile";
import ChartComponent from "../usableComponents/playerChart";

const Homesignedin = () => {
  return (
    <div>
      <Navbar2 />
      <div className="max-w-screen-xl mx-auto">
        <PlayerProfile />
        <h1 className="text-6xl font-bold text-white">
          Your <span className="text-designColor capitalize">Stats</span>
        </h1>
        <ChartComponent />
      </div>
    </div>
  );
};

export default Homesignedin;
