import React from "react";
import jsImg from "../../assets/images/playerIMG/js.jpg";
const PlayerProfile = () => {
  const player = {
    imageUrl: jsImg,
    name: "LeBron James",
    age: 38,
    team: "Los Angeles Lakers",
    position: "Small Forward",
    height: "6'9\"",
    weight: "250 lbs",
    college: "St. Vincent-St. Mary High School",
  };

  return (
    <div className="bg-gray-700 rounded-lg p-8 shadow-md w-11/12 md:w-4/5 mx-auto">
      <div className="flex">
        <div className="w-1/3">
          <img
            className="rounded-lg object-cover w-full h-96"
            src={player.imageUrl}
            alt={player.name}
          />
        </div>
        <div className="w-2/3 ml-12">
          <h2 className="text-4xl font-semibold mb-6">{player.name}</h2>
          <p className="text-xl mb-2">
            <strong>Age:</strong> {player.age}
          </p>
          <p className="text-xl mb-2">
            <strong>Team:</strong> {player.team}
          </p>
          <p className="text-xl mb-2">
            <strong>Position:</strong> {player.position}
          </p>
          <p className="text-xl mb-2">
            <strong>Height:</strong> {player.height}
          </p>
          <p className="text-xl mb-2">
            <strong>Weight:</strong> {player.weight}
          </p>
          <p className="text-xl mb-2">
            <strong>College:</strong> {player.college}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerProfile;
