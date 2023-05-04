const PlayerTable = ({
  players,
  selectedColumn,
  initialPlayer,
  selectedPlayers,
  handleColumnClick,
}) => {
  const displayPlayers = [
    players[initialPlayer],
    ...selectedPlayers.map((index) => players[index]),
  ];

  const columnHeaderClasses = (column) =>
    `py-2 sm:py-3 text-left font-medium ${
      column === selectedColumn ? "bg-indigo-500" : "bg-gray-700"
    } text-gray-300 uppercase tracking-wider cursor-pointer`;

  return (
    <div className="grid grid-cols-1 gap-4">
      {displayPlayers.map((player, playerIndex) => (
        <div key={playerIndex} className="bg-gray-800 rounded-md p-4">
          <h2 className="text-lg font-bold text-gray-300 mb-4">
            {player.name}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left font-medium text-gray-300 uppercase tracking-wider">
                    Game
                  </th>
                  {Object.keys(player.games[0]).map((column, index) => (
                    <th
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleColumnClick(column);
                      }}
                      className={columnHeaderClasses(column)}
                    >
                      {column.charAt(0).toUpperCase() + column.slice(1)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {player.games.map((game, gameIndex) => (
                  <tr key={gameIndex}>
                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-gray-100">
                      {gameIndex + 1}
                    </td>
                    {Object.values(game).map((value, index) => (
                      <td
                        key={index}
                        className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-gray-100"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerTable;
