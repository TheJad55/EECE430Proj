import React from "react";
import Navbar2 from "../navbar/Navbar2";
import PlayerProfile from "../usableComponents/PlayerProfile";
import ChartComponent from "../usableComponents/playerChart";

const Homesignedin = () => {
  return (
    <div>
      <Navbar2 />
      <div className="max-w-screen-xl mx-auto">
        <div className="w-full py-20 border-b-[1px] border-b-black">
          <PlayerProfile />
        </div>
        <h1 className="text-6xl font-bold text-white mt-8">
          Your <span className="text-designColor capitalize">Stats</span>
        </h1>
        <div className="w-full py-20 border-b-[1px] border-b-black">
          <ChartComponent />
        </div>
      </div>
    </div>
  );
};

export default Homesignedin;
