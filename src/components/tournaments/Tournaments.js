import React from "react";
import TournamentTable from "../usableComponents/TournamentTable";
import Navbar from "../navbar/Navbar";
import TournamentOptions from "../usableComponents/TournamentOptions";

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    marginTop: "5%",
  },
};

const Tournaments = () => {
  return (
    <div className="w-full h-auto bg-bodyColor text-lightText ">
      <Navbar />

      <div style={styles.container}>
        <TournamentTable />
        <TournamentOptions />
      </div>
    </div>
  );
};

export default Tournaments;
