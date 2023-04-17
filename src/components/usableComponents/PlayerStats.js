import React, { useState } from "react";
import ChartComponent from "./playerChart";
import PlayerTable from "./PlayerTable";

const PlayerStats = () => {
  const playerData = [
    {
      name: "LeBron James",
      games: [
        { points: 25, rebounds: 5, assists: 8, steals: 1, blocks: 1 },
        { points: 30, rebounds: 10, assists: 6, steals: 3, blocks: 0 },
        { points: 20, rebounds: 8, assists: 12, steals: 2, blocks: 2 },
        { points: 28, rebounds: 7, assists: 5, steals: 1, blocks: 1 },
        { points: 32, rebounds: 12, assists: 7, steals: 2, blocks: 1 },
        { points: 25, rebounds: 5, assists: 8, steals: 1, blocks: 1 },
        { points: 30, rebounds: 10, assists: 6, steals: 3, blocks: 0 },
      ],
    },
    {
      name: "Kevin Durant",
      games: [
        { points: 20, rebounds: 5, assists: 8, steals: 1, blocks: 1 },
        { points: 25, rebounds: 10, assists: 6, steals: 3, blocks: 0 },
        { points: 15, rebounds: 8, assists: 12, steals: 2, blocks: 2 },
        { points: 23, rebounds: 7, assists: 5, steals: 1, blocks: 1 },
        { points: 27, rebounds: 12, assists: 7, steals: 2, blocks: 1 },
      ],
    },
    {
      name: "Michael Jordan",
      games: [
        { points: 30, rebounds: 5, assists: 5, steals: 2, blocks: 0 },
        { points: 40, rebounds: 7, assists: 3, steals: 1, blocks: 1 },
        { points: 35, rebounds: 6, assists: 7, steals: 3, blocks: 0 },
        { points: 37, rebounds: 8, assists: 5, steals: 2, blocks: 2 },
        { points: 45, rebounds: 10, assists: 4, steals: 1, blocks: 0 },
        { points: 32, rebounds: 5, assists: 6, steals: 2, blocks: 1 },
        { points: 30, rebounds: 7, assists: 4, steals: 1, blocks: 0 },
        { points: 35, rebounds: 9, assists: 5, steals: 3, blocks: 2 },
        { points: 32, rebounds: 6, assists: 7, steals: 1, blocks: 0 },
        { points: 30, rebounds: 8, assists: 4, steals: 2, blocks: 1 },
      ],
    },
    {
      name: "Kobe Bryant",
      games: [
        { points: 25, rebounds: 4, assists: 6, steals: 1, blocks: 0 },
        { points: 30, rebounds: 7, assists: 4, steals: 2, blocks: 0 },
        { points: 27, rebounds: 5, assists: 3, steals: 1, blocks: 1 },
        { points: 35, rebounds: 9, assists: 5, steals: 3, blocks: 2 },
        { points: 32, rebounds: 6, assists: 7, steals: 1, blocks: 0 },
      ],
    },
  ];

  const totalGames = playerData.reduce(
    (acc, player) => Math.max(acc, player.games.length),
    0
  );

  const allTeamGames = Array.from({ length: totalGames }, (_, i) => {
    const sumStats = playerData.reduce(
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

    // Calculate the average for each stat
    const avgStats = Object.keys(sumStats).reduce((acc, stat) => {
      acc[stat] = sumStats[stat] / playerData.length;
      return acc;
    }, {});

    return avgStats;
  });
  playerData.push({
    name: "All Team",
    games: allTeamGames,
  });

  const [initialPlayer] = useState(0);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [selectedGame, setSelectedGame] = useState("all");
  const [selectedColumn, setSelectedColumn] = useState("points");
  const [selectedRow, setSelectedRow] = useState(null);
  const [displayBarChart, setDisplayBarChart] = useState(false);

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

  const handleRowClick = (index) => {
    if (index === "all") {
      setDisplayBarChart((prevDisplayBarChart) => !prevDisplayBarChart);
      setSelectedRow((prevSelectedRow) =>
        prevSelectedRow === "all" ? null : "all"
      );
    } else {
      if (selectedRow === index) {
        setSelectedRow(null);
      } else {
        setSelectedRow(index);
      }
    }
  };
  const displayData = selectedPlayers
    .map((playerId) =>
      selectedGame === "all"
        ? playerData[playerId].games
        : [playerData[playerId].games[selectedGame]]
    )
    .flat();

  const renderStatsRow = (gameData, index) => {
    const gameNumber =
      selectedGame === "all" ? index + 1 : parseInt(selectedGame) + 1;
    return (
      <tr key={index}>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
          Game {gameNumber}
        </td>
        {Object.values(gameData).map((value, index) => (
          <td
            key={index}
            className="px-6 py-4 whitespace-nowrap text-sm text-white"
          >
            {value}
          </td>
        ))}
      </tr>
    );
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
