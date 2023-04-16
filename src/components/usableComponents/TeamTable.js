import React, { useState } from "react";

const BasketballTeamTable = ({ teamData = [] }) => {
  const [selectedGame, setSelectedGame] = useState("all");

  const calculatePlayerStats = (playerStats) => {
    const filteredStats =
      selectedGame === "all"
        ? playerStats
        : playerStats.filter((stat) => stat.game === Number(selectedGame));

    return filteredStats.reduce(
      (acc, curr) => ({
        ...acc,
        gamesPlayed: acc.gamesPlayed + curr.gamesPlayed,
        points: acc.points + curr.points,
        rebounds: acc.rebounds + curr.rebounds,
        assists: acc.assists + curr.assists,
        steals: acc.steals + curr.steals,
        blocks: acc.blocks + curr.blocks,
      }),
      {
        gamesPlayed: 0,
        points: 0,
        rebounds: 0,
        assists: 0,
        steals: 0,
        blocks: 0,
      }
    );
  };

  return (
    <div>
      <select
        className="w-full p-2 bg-gray-800 text-white rounded-md mb-4"
        value={selectedGame}
        onChange={(e) => setSelectedGame(e.target.value)}
      >
        <option value="all">All Season</option>
        {Array.from(
          new Set(
            teamData.flatMap((player) => player.stats.map((stat) => stat.game))
          )
        ).map((game) => (
          <option key={game} value={game}>
            Game {game}
          </option>
        ))}
      </select>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Games Played
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Points
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rebounds
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Assists
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Steals
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Blocks
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-700 divide-y divide-gray-200">
          {teamData.map((player) => {
            const playerStats = calculatePlayerStats(player.stats);

            return (
              <tr key={player.name}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                  {player.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {playerStats.gamesPlayed}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {playerStats.points}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {playerStats.rebounds}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {playerStats.assists}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {playerStats.steals}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {playerStats.blocks}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BasketballTeamTable;
