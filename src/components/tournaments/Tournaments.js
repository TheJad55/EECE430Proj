import React from 'react';
import TournamentTable from '../usableComponents/TournamentTable'
import Navbar from '../navbar/Navbar';


const Tournaments = () => {
    return (

      <div className="w-full h-auto bg-bodyColor text-lightText ">
        <Navbar />

        <div className="max-w-screen-xl mx-auto">
        <TournamentTable />
      </div>
      </div>
    );
  }
  
  export default Tournaments;