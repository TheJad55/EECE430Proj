import React from "react";

const PlayerTable = ({
  players,
  selectedColumn,
  setSelectedPlayers,
  initialPlayer,
  selectedPlayers,
}) => {
  const displayPlayers = [
    players[initialPlayer],
    ...selectedPlayers.map((index) => players[index]),
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {displayPlayers.map((player, playerIndex) => (
        <div key={playerIndex} className="bg-gray-800 rounded-md p-4">
          <h2 className="text-lg font-bold text-gray-300">{player.name}</h2>
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  Game
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                  {selectedColumn}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {player.games.map((game, gameIndex) => (
                <tr key={gameIndex}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                    {gameIndex + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                    {game[selectedColumn]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default PlayerTable;
