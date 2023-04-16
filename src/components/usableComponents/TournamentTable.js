import React from "react";

const tournamentData = [
  { team: "Team A", wins: 3, losses: 0 },
  { team: "Team B", wins: 2, losses: 1 },
  { team: "Team C", wins: 1, losses: 2 },
  { team: "Team D", wins: 7, losses: 3 },
];

const styles = {
  container: {
    marginTop: "0%",
    marginLeft: "10%",
    width: "30%",
  },
  table: {
    border: "3px solid black",
    width: "100%",
    textAlign: "center",
    backgroundColor: "#1F2937",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.75)",
  },
  th: {
    color: "#f79f2a",
    borderBottom: "1px solid white",
    fontSize: "22px",
  },
  td: {
    color: "white",
    borderBottom: "1px solid white",
    padding: "10px",
    fontSize:"20px",
  },
  even: {
    backgroundColor: "#2D3748",
  },
  odd: {
    backgroundColor: "#4A5568",
  },
};

const TournamentTable = ({ tournamentIndex }) => {
  // sort the data based on wins in descending order
  const sortedData = tournamentData.sort((a, b) => b.wins - a.wins);

  // calculate position dynamically based on index
  const dataWithPosition = sortedData.map((team, index) => ({
    ...team,
    position: index + 1,
  }));

  return (
    <div style={styles.container}>
        <div className="text-base uppercase font-titleFont mb-4 ">Regional Tournament</div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Position</th>
            <th style={styles.th}>Team</th>
            <th style={styles.th}>Wins</th>
            <th style={styles.th}>Losses</th>
          </tr>
        </thead>
        <tbody>
          {dataWithPosition.map((team, index) => (
            <tr
              key={team.position}
              style={index % 2 === 0 ? styles.even : styles.odd}
            >
              <td style={styles.td}>{team.position}</td>
              <td style={styles.td}>{team.team}</td>
              <td style={styles.td}>{team.wins}</td>
              <td style={styles.td}>{team.losses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TournamentTable;
