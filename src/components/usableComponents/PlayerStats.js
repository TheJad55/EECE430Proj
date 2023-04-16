import React, { useState } from "react";
import ChartComponent from "./PlayerChart";

const PlayerStatsTable = () => {
  const playerData = {
    name: "LeBron James",
    games: [
      { points: 25, rebounds: 5, assists: 8, steals: 1, blocks: 1 },
      { points: 30, rebounds: 10, assists: 6, steals: 3, blocks: 0 },
      { points: 20, rebounds: 8, assists: 12, steals: 2, blocks: 2 },
    ],
  };

  const [selectedGame, setSelectedGame] = useState("all");
  const [selectedColumn, setSelectedColumn] = useState("points");
  const [selectedRow, setSelectedRow] = useState(null);
  const [displayBarChart, setDisplayBarChart] = useState(false);

  const handleSelectChange = (e) => {
    setSelectedGame(e.target.value);
    if (e.target.value !== "all") {
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
  const displayData =
    selectedGame === "all"
      ? playerData.games
      : [playerData.games[selectedGame]];

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
        <div className="mb-4">
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
            {playerData.games.map((_, index) => (
              <option key={index} value={index}>
                Game {index + 1}
              </option>
            ))}
          </select>
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Game
              </th>
              {Object.keys(playerData.games[0]).map((key, index) => (
                <th
                  key={index}
                  onClick={() => handleColumnClick(key)}
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer ${
                    selectedColumn === key ? "text-orange-400" : "text-gray-500"
                  }`}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-gray-700 divide-y divide-gray-200">
            {displayData.map((gameData, index) =>
              renderStatsRow(gameData, index)
            )}
            {selectedGame === "all" && (
              <tr
                className={`bg-gray-800 ${
                  selectedRow === "all" ? "bg-orange-400" : ""
                }`}
                onClick={() => handleRowClick("all")}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                  All Season
                </td>
                {Object.keys(playerData.games[0]).map((key, index) => {
                  const total = playerData.games.reduce(
                    (acc, game) => acc + game[key],
                    0
                  );
                  const average = total / playerData.games.length;
                  return (
                    <td
                      key={index}
                      className="px-6 py-4 whitespace-nowrap text-sm text-white"
                    >
                      {average.toFixed(1)}
                    </td>
                  );
                })}
              </tr>
            )}
          </tbody>
        </table>
        <div className="mt-10">
          <ChartComponent
            games={playerData.games}
            selectedGame={selectedGame}
            selectedColumn={selectedColumn}
            displayBarChart={displayBarChart}
          />
        </div>
      </div>
    </section>
  );
};

export default PlayerStatsTable;
