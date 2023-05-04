import React, { useEffect, useState } from "react";
import teamLogo from "../../assets/images/playerIMG/teamLogo.png";

const PlayerTeam = () => {
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/teams/user", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
        });

        const data = await response.json();
        setTeamData(data);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchTeamData();
  }, []);

  if (!teamData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <div
          className="w-3/4 h-6 rounded"
          style={{
            background:
              "linear-gradient(90deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))",
            backgroundSize: "200px 100%",
            animation: "loading 1.2s ease-in-out infinite",
          }}
        ></div>
        <div
          className="w-2/3 h-6 rounded"
          style={{
            background:
              "linear-gradient(90deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))",
            backgroundSize: "200px 100%",
            animation: "loading 1.2s ease-in-out infinite",
          }}
        ></div>
        <div
          className="w-1/2 h-6 rounded"
          style={{
            background:
              "linear-gradient(90deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))",
            backgroundSize: "200px 100%",
            animation: "loading 1.2s ease-in-out infinite",
          }}
        ></div>
      </div>
    );
  }

  return (
    <section id="team" className="w-full py-20 border-b-[1px] border-b-black">
      <div className="content-center mx-auto">
        <h1 className="text-6xl font-bold text-white text-center mb-5">
          Your <span className="text-designColor capitalize">Team</span>
        </h1>
        <div className="bg-gray-800 shadow-shadowOne rounded-lg p-8 shadow-md w-11/12 md:w-4/5 mx-auto height: my-10">
          <div className="flex scale-100">
            <div className="w-1/2">
              <img
                className="rounded-lg object-contain w-full h-96"
                src={teamLogo}
                alt={teamData.TeamName}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </div>
            <div className="w-2/3 ml-12">
              <h2 className="text-4xl font-semibold mb-6">
                {teamData.TeamName}
              </h2>
              <p className="text-xl md:text-2xl mb-2 md:mb-4">
                <strong>Country:</strong> {teamData.Country}
              </p>
              <p className="text-xl md:text-2xl mb-2 md:mb-4">
                <strong>Games Won:</strong> {teamData.GamesWon}
              </p>
              <p className="text-xl md:text-2xl mb-2 md:mb-4">
                <strong>Games Lost:</strong> {teamData.GamesLost}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayerTeam;
