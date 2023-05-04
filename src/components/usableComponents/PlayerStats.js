import React, { useState, useEffect } from "react";
import ChartComponent from "./playerChart";
import PlayerTable from "./PlayerTable";
const fetchCurrentUser = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/user/me/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    });

    const userData = await response.json();
    return userData.username;
  } catch (error) {
    console.error("Failed to fetch current user:", error);
  }
};
const fetchData = async () => {
  try {
    const currentUser = await fetchCurrentUser();
    // Fetch team members
    const teamMembersResponse = await fetch(
      "http://127.0.0.1:8000/getteamates/user",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        },
      }
    );
    const teamMembers = await teamMembersResponse.json();

    const teamStatsPromises = teamMembers.map(async (member) => {
      console.log("Fetching stats for:", member);
      const memberStatsResponse = await fetch(
        `http://127.0.0.1:8000/getstats/${member}`
      );
      const memberStats = await memberStatsResponse.json();

      return {
        name: member,
        games: memberStats.map((game) => ({
          game_number: game.game_number,
          points: game.points,
          rebounds: game.rebounds,
          assists: game.assists,
          steals: game.steals,
          blocks: game.blocks,
        })),
      };
    });
    const teamStats = await Promise.all(teamStatsPromises);

    // Move current user to the front of the list
    const currentUserIndex = teamStats.findIndex(
      (player) => player.name === currentUser
    );
    if (currentUserIndex !== -1) {
      const currentUserStats = teamStats.splice(currentUserIndex, 1)[0];
      teamStats.unshift(currentUserStats);
    }

    // Get all unique game_numbers from all players
    const allGameNumbers = new Set(
      teamStats.flatMap((player) =>
        player.games.map((game) => game.game_number)
      )
    );

    // Fill missing games with zeros for each player
    teamStats.forEach((player) => {
      const playerGameNumbers = new Set(
        player.games.map((game) => game.game_number)
      );
      const missingGames = [...allGameNumbers].filter(
        (gameNumber) => !playerGameNumbers.has(gameNumber)
      );

      missingGames.forEach((gameNumber) => {
        player.games.push({
          game_number: gameNumber,
          points: 0,
          rebounds: 0,
          assists: 0,
          steals: 0,
          blocks: 0,
        });
      });

      // Sort games by game_number
      player.games.sort((a, b) => a.game_number - b.game_number);
    });

    return teamStats;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

const PlayerStats = () => {
  const [playerData, setPlayerData] = useState([]);
  const [initialPlayer] = useState(0);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [selectedGame, setSelectedGame] = useState("all");
  const [selectedColumn, setSelectedColumn] = useState("points");
  const [selectedRow, setSelectedRow] = useState(null);
  const [displayBarChart, setDisplayBarChart] = useState(false);

  useEffect(() => {
    fetchData().then((data) => {
      const totalGames = data.reduce(
        (acc, player) => Math.max(acc, player.games.length),
        0
      );

      const allTeamGames = Array.from({ length: totalGames }, (_, i) => {
        const sumStats = data.reduce(
          (acc, player) => {
            if (player.games[i]) {
              Object.keys(player.games[i]).forEach((stat) => {
                acc[stat] += player.games[i][stat];
              });
            }
            return acc;
          },
          { points: 0, rebounds: 0, assists: 0, steals: 0, blocks: 0 }
        );

        const avgStats = Object.keys(sumStats).reduce((acc, stat) => {
          acc[stat] = sumStats[stat] / data.length;
          return acc;
        }, {});

        return avgStats;
      });

      data.push({
        name: "All Team",
        games: allTeamGames,
      });

      setPlayerData(data);
    });
  }, []);

  console.log("playerData:", playerData);

  if (!playerData || !playerData.length) {
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

  const handlePlayerSelectChange = (e) => {
    const playerId = parseInt(e.target.value);
    if (isNaN(playerId)) {
      setSelectedPlayers([]);
    } else {
      setSelectedPlayers([playerId]);
    }
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedGame(value);
    if (value !== "all") {
      setSelectedRow(null);
    }
  };

  const handleColumnClick = (column) => {
    setSelectedColumn(column);
  };

  return (
    <section id="stats" className="w-full py-20 border-b-[1px] border-b-black">
      <div>
        <PlayerTable
          players={playerData}
          selectedColumn={selectedColumn}
          setSelectedPlayers={setSelectedPlayers}
          initialPlayer={initialPlayer}
          selectedPlayers={selectedPlayers}
          handleColumnClick={handleColumnClick}
        />

        <div className="mb-4 mt-8">
          <label
            htmlFor="game-select"
            className="block text-sm font-medium text-gray-700"
          >
            Select Game
          </label>
          <select
            id="game-select"
            value={selectedGame}
            onChange={handleSelectChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-700 text-white border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="all">All Games</option>
            {playerData[initialPlayer].games.map((_, index) => (
              <option key={index} value={index}>
                Game {index + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="player-select"
            className="block text-sm font-medium text-gray-700"
          >
            Select Player
          </label>
          <select
            id="player-select"
            onChange={handlePlayerSelectChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-700 text-white border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option>Select Player</option>
            {playerData
              .filter((_, index) => index !== initialPlayer)
              .map((player, index) => (
                <option key={index} value={index + 1}>
                  {player.name}
                </option>
              ))}
          </select>
        </div>

        <div className="mt-10">
          <ChartComponent
            games={playerData.map((player) => player.games)}
            selectedGame={selectedGame}
            selectedColumn={selectedColumn}
            displayBarChart={displayBarChart}
            selectedPlayers={selectedPlayers}
          />
        </div>
      </div>
    </section>
  );
};

export default PlayerStats;
