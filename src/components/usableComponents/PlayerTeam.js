import React from "react";
import teamLogo from "../../assets/images/playerIMG/teamLogo.png";
const PlayerTeam = () => {
  
  const player = {
    imageUrl: teamLogo,
    name: "LeBron James",
    age: 38,
    team: "Boston Celtics",
    position: "Small Forward",
    height: "6'9\"",
    weight: "250 lbs",
    college: "St. Vincent-St. Mary High School",
  };

  const team ={
    coach: "John Doe",
    wins: 4,
    Standings: "3rd",
    Next: "2/7/2023",
    training: "1/7/2023",
    message: "Do not miss training! It is essential for our next game!"
  }

  return (
    <section
      id="profile"
      className="w-full py-20 border-b-[1px] border-b-black"
    >
      <div className="content-center mx-auto">
        <h1 className="text-6xl font-bold text-white text-center mb-5">
          Your <span className="text-designColor capitalize">Team</span>
        </h1>
        <div className="bg-gray-800 shadow-shadowOne rounded-lg p-8 shadow-md w-11/12 md:w-4/5 mx-auto height: my-10">
          <div className="flex scale-100">
            <div className="w-1/2">
              <img
                className="rounded-lg object-contain w-full h-96"
                src={player.imageUrl}
                alt={player.name}
                style={{
                  maxWidth: '100%',
                  height: 'auto'
                }}
              />
            </div>
            <div className="w-2/3 ml-12">
              <h2 className="text-4xl font-semibold mb-6">{player.team}</h2>
              <p className="text-xl md:text-2xl mb-2 md:mb-4">
                <strong>Coach:</strong> {team.coach}
              </p>
              <p className="text-xl md:text-2xl mb-2 md:mb-4">
                <strong>Team Wins:</strong> {team.Standings}
              </p>
              <p className="text-xl md:text-2xl mb-2 md:mb-4">
                <strong>Next Game:</strong> {team.Next}
              </p>
              <p className="text-xl md:text-2xl mb-2 md:mb-4">
                <strong>Training:</strong> {team.training}
              </p>
              <p className="text-xl md:text-2xl mb-2 md:mb-4">
                <strong>Message:</strong> <ul className="mt-[5%]">{team.message}</ul>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayerTeam;
