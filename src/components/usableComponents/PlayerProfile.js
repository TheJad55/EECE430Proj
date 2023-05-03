import React, { useState, useEffect } from "react";

const PlayerProfile = () => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/user/me/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("access_token"),
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPlayer(data);
        } else {
          console.error("Failed to fetch player data");
        }
      } catch (error) {
        console.error("Error fetching player data:", error);
      }
    };

    fetchPlayerData();
  }, []);

  if (!player) {
    return <div>Loading...</div>;
  }

  return (
    <section
      id="profile"
      className="w-full py-20 border-b-[1px] border-b-black"
    >
      <div className="content-center mx-auto">
        <h1 className="text-6xl font-bold text-white text-center mb-5">
          Welcome to your profile
        </h1>
        <h2 className="text-6xl font-bold text-designColor capitalize text-center">
          {player.Firstname} {player.Lastname}
        </h2>
        <div className="bg-gray-800 shadow-shadowOne rounded-lg p-8 shadow-md w-11/12 md:w-4/5 mx-auto height: my-10">
          <div className="flex scale-100">
            <div className="w-1/3">
              {/* You can replace this with an actual image URL from the API if available */}
              <img
                className="rounded-lg object-cover w-full h-96"
                src="https://via.placeholder.com/150"
                alt={`${player.Firstname} ${player.Lastname}`}
              />
            </div>
            <div className="w-2/3 ml-12">
              <h2 className="text-4xl font-semibold mb-6">
                {player.Firstname} {player.Lastname}
              </h2>
              <p className="text-xl mb-2">
                <strong>Age:</strong> {player.Age}
              </p>
              <p className="text-xl mb-2">
                <strong>Team:</strong> {player.Team}
              </p>
              <p className="text-xl mb-2">
                <strong>Position:</strong> {player.Position}
              </p>
              <p className="text-xl mb-2">
                <strong>Height:</strong> {player.Height} cm
              </p>
              <p className="text-xl mb-2">
                <strong>Weight:</strong> {player.Weight} kg
              </p>
              <p className="text-xl mb-2">
                <strong>College:</strong> {player.College}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayerProfile;
