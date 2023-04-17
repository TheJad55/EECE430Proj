import React from "react";

const tournamentData = [  
  { team: "Team A", wins: 3, losses: 0, last6: ["W", "W", "W", "L", "W", "W"] },
  { team: "Team B", wins: 2, losses: 1, last6: ["W", "L", "W", "L", "W", "W"] },
  { team: "Team C", wins: 1, losses: 2, last6: ["L", "W", "W", "L", "L", "L"] },
  { team: "Team D", wins: 7, losses: 3, last6: ["W", "W", "W", "L", "W", "W"] },
  { team: "Team E", wins: 5, losses: 2, last6: ["W", "W", "L", "W", "L", "W"] },
  { team: "Team F", wins: 2, losses: 4, last6: ["L", "L", "W", "W", "L", "L"] },
  { team: "Team G", wins: 6, losses: 1, last6: ["W", "W", "W", "W", "L", "W"] },
  { team: "Team H", wins: 1, losses: 6, last6: ["L", "L", "L", "W", "L", "L"] },
  { team: "Team I", wins: 4, losses: 3, last6: ["W", "L", "W", "L", "W", "L"] },
  { team: "Team J", wins: 3, losses: 4, last6: ["W", "W", "L", "L", "W", "L"] },
  { team: "Team K", wins: 6, losses: 2, last6: ["W", "W", "L", "W", "W", "L"] },
  { team: "Team L", wins: 2, losses: 5, last6: ["L", "W", "L", "L", "W", "L"] },
];


const TournamentTable = ({ tournamentIndex }) => {
  // sort the data based on wins in descending order
  const sortedData = tournamentData.sort((a, b) => b.wins - a.wins);

  // calculate position dynamically based on index
  const dataWithPosition = sortedData.map((team, index) => ({
    ...team,
    position: index + 1,
  }));

  const columnHeaderClasses = (column) =>
    `px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider cursor-pointer`;

  const rowClasses = (index) =>
    `bg-${index % 2 === 0 ? "gray-800" : "gray-700"} rounded-md`;

  const thClasses = `px-3 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-300 uppercase tracking-wider`;

  const tdClasses = `px-3 sm:px-6 py-2 sm:py-3 whitespace-nowrap text-sm font-medium text-gray-100`;

  const last6BoxClasses = (result) =>
    `w-5 h-5 m-2 ${
      result === "W" ? "bg-orange-500" : "bg-gray-700"
    } border-2 border-black`;

  const totalGamesPlayed = (team) => team.wins + team.losses;

const scrollableTable = `max-h-[80vh] overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-400`;
  return (
    <div className="grid grid-cols-1 gap-4 mt-4">
      <div className="bg-gray-800 rounded-md p-4">
        <h2 className="text-lg font-bold text-gray-300 mb-4">
          Regional Tournament
        </h2>
        <div
          className={`w-full ${dataWithPosition.length > 10 ? scrollableTable : ""}`}
        >
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-700">
              <tr>
                <th className={thClasses}>Position</th>
                <th className={thClasses}>Team</th>
                <th className={columnHeaderClasses("games-played")}>
                  Games Played
                </th>
                <th className={columnHeaderClasses("wins")}>Wins</th>
                <th className={columnHeaderClasses("losses")}>Losses</th>
                <th className={columnHeaderClasses("last-6-games")}>
                  Last 6 Games
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dataWithPosition.map((team, index) => (
                <tr key={team.position} className={rowClasses(index)}>
                  <td className={tdClasses}>{team.position}</td>
                  <td className={tdClasses}>{team.team}</td>
                  <td className={tdClasses}>{totalGamesPlayed(team)}</td>
                  <td className={tdClasses}>{team.wins}</td>
                  <td className={tdClasses}>{team.losses}</td>
                  <td className={tdClasses}>
                    {[...Array(6)].map((_, index) => (
                      <td
                      key={index}
                      className={`${last6BoxClasses(
                        team.last6[index]
                      )} rounded-sm`}
                    />
                  ))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TournamentTable;
