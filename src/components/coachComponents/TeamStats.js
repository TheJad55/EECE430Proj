import React, { useState, useEffect } from "react";
import ChartComponent1 from "./TeamChart";
import PlayerTable from "../usableComponents/PlayerTable";
const fetchData = async () => {
  try {
    const teamMembersResponse = await fetch(
      "http://127.0.0.1:8000/getteamates/team",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("access_token"),
        },
      }
    );
    const teamMembers = await teamMembersResponse.json();

    if (!teamMembers || !teamMembers.length) {
      throw new Error("Failed to fetch team members");
    }

    const teamStatsPromises = teamMembers.map(async (member) => {
      console.log("Fetching stats for:", member);
      const memberStatsResponse = await fetch(
        `http://127.0.0.1:8000/getstats/${member}`
      );
      const memberStats = await memberStatsResponse.json();

      if (memberStats.length === 0 && teamMembers.length === 1) {
        throw new Error(`No stats found for member ${member}`);
      }

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

      missingGames.forEach(() => {
        player.games.push({
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
    throw new Error("Failed to fetch data: " + error.message);
  }
};

const PlayerStats = () => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [selectedPlayers2, setSelectedPlayers2] = useState([]);
  const [playerData, setPlayerData] = useState([]);
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

        const avgStats = Object.keys(sumStats)
          .filter((stat) => stat !== "game_number")
          .reduce((acc, stat) => {
            acc[stat] = parseFloat((sumStats[stat] / data.length).toFixed(2));
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

  const handlePlayerSelectChange2 = (e) => {
    const playerId = parseInt(e.target.value);
    if (isNaN(playerId)) {
      setSelectedPlayers2([]);
    } else {
      setSelectedPlayers2([playerId]);
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
        {selectedPlayers2.length > 0 ? (
          <PlayerTable
            players={playerData}
            selectedColumn={selectedColumn}
            setSelectedPlayers={setSelectedPlayers}
            initialPlayer={selectedPlayers2}
            selectedPlayers={selectedPlayers}
            handleColumnClick={handleColumnClick}
          />
        ) : (
          <div>Please select a player to display their stats</div>
        )}
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
            {selectedPlayers2.length > 0 ? (
              <>
                <option value="all">All Games</option>
                {playerData[selectedPlayers2].games.map((_, index) => (
                  <option key={index} value={index}>
                    Game {index + 1}
                  </option>
                ))}
              </>
            ) : (
              <option value="none">Select a Player First</option>
            )}
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
            onChange={handlePlayerSelectChange2}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-700 text-white border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option>Select Player</option>
            {playerData.map((player, index) => (
              <option key={index} value={index}>
                {player.name}
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
            {playerData.map((player, index) => (
              <option key={index} value={index}>
                {player.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-10">
          <ChartComponent1
            games={playerData.map((player) => player.games)}
            selectedGame={selectedGame}
            selectedColumn={selectedColumn}
            displayBarChart={displayBarChart}
            selectedPlayers={selectedPlayers}
            selectedPlayers2={selectedPlayers2}
          />
        </div>
      </div>
    </section>
  );
};

export default PlayerStats;
