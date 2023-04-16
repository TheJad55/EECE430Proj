import React from "react";

const tournamentData = [
  {
    name: "Tournament A",
    date: "2023-05-01",
    duration: "3 days",
  },
  {
    name: "Tournament B",
    date: "2023-06-15",
    duration: "2 days",
  },
  {
    name: "Tournament C",
    date: "2023-07-20",
    duration: "4 days",
  },
  {
    name: "Tournament D",
    date: "2023-07-20",
    duration: "4 days",
  },
  {
    name: "Tournament E",
    date: "2023-07-20",
    duration: "4 days",
  },
];

const styles = {
    container: {
      marginTop: "0%",
      marginRight: "10%",
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
      fontSize:"20px",
    },
    td: {
      color: "white",
      borderBottom: "1px solid white",
      padding: "15px",
      fontSize:"20px",
    },
    duration: {
      color: "white",
      borderTop: "1px solid white",
      padding: "15px",
      fontSize:"16px",
    },
    even: {
      backgroundColor: "#2D3748",
    },
    odd: {
      backgroundColor: "#4A5568",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "flex-end",
      flexDirection: "row",
      marginTop: "auto",
    },
    button: {
      backgroundColor: "#f79f2a",
      color: "white",
      border: "none",
      borderRadius: "20px",
      padding: "10px",
      cursor: "pointer",
      marginLeft: "10px",
    },
  };

  const TournamentOptions = () => {
    return (
      <div style={styles.container}>
        <div className="text-base uppercase font-titleFont mb-4 ">Brouse Tournaments</div>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Tournament Name</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Duration</th>
              <th style={styles.th}></th>
            </tr>
          </thead>
          <tbody>
            {tournamentData.map((tournament, index) => (
              <tr
                key={index}
                style={index % 2 === 0 ? styles.even : styles.odd}
              >
                <td style={styles.td}>{tournament.name}</td>
                <td style={styles.td}>{tournament.date}</td>
                <td style={styles.duration}>{tournament.duration}</td>
                <td style={styles.td}>
                  <div style={styles.buttonContainer}>
                    <button style={styles.button}>Join</button>
                    <button style={styles.button}>View</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

export default TournamentOptions;
