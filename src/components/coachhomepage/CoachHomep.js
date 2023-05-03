import React from "react";
import BasketballTeamTable from "../usableComponents/TeamTable";
import Navbar4 from "../navbar/Navbar4";
import CoachProfile from "../usableComponents/CoachProfile";
import TeamStats from "../coachComponents/TeamStats";
import TournamentTable from "../usableComponents/TournamentTable";
import TournamentOptions from "../usableComponents/TournamentOptions";
import ContactCoach from "../contact/ContactCoach";
import Calendar from "../calendar/Calendar.jsx";
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
const styles = {
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    marginTop: "5%",
  },
};

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
          <h1 className="text-6xl font-bold text-white mt-8">
            <span className="text-designColor capitalize">Tournaments</span>
          </h1>

          <h1 className="text-6xl font-bold text-white mt-20">
            Add Player{" "}
            <span className="text-designColor capitalize">Stats</span>
          </h1>
          <ContactCoach />
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default CoachHomep;
