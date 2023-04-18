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
    width: "100%",
  },
  table: {
    width: "100%",
    textAlign: "center",
    backgroundColor: "#1F2937",
    overflow: "hidden",
  },
  th: {
    color: "#f79f2a",
    borderBottom: "1px solid white",
    fontSize: "20px",
    padding: "10px",
  },
  td: {
    color: "white",
    borderBottom: "1px solid white",
    padding: "15px",
    fontSize: "20px",
  },
  duration: {
    color: "white",
    borderTop: "1px solid white",
    borderBottom: "1px solid white",
    padding: "15px",
    fontSize: "16px",
  },
  even: {
    backgroundColor: "#1F2937",
  },
  odd: {
    backgroundColor: "#4A5568",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: "20px",
    marginLeft: "0"
  },
  buttonBox: {
    backgroundColor: "#f79f2a",
    borderRadius: "12px",
    padding: "10px",
    cursor: "pointer",
    marginLeft: "10px",
    border: "2px solid #f79f2a",
  },
  button: {
    color: "white",
    border: "none",
    fontSize: "18px",
  },
};
const TournamentOptions = () => {
  return (
    <div className="grid grid-cols-1 gap-4 mt-4">
      <div className="bg-gray-800 rounded-md p-4">
        <div className="text-base uppercase font-titleFont mb-4">
          Browse Tournaments
        </div>
        <div className="w-full" style={styles.container}>
          <table className="w-full divide-y divide-gray-200" style={styles.table}>
            <thead className="bg-gray-700">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Tournament Name
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tournamentData.map((tournament, index) => (
                <tr key={index} style={index % 2 === 0 ? styles.even : styles.odd}>
                  <td style={styles.td}>{tournament.name}</td>
                  <td style={styles.td}>{tournament.date}</td>
                  <td style={styles.duration}>{tournament.duration}</td>
                  <td style={styles.td}>
                    <div style={styles.buttonContainer}>
                      <div style={styles.buttonBox}>
                        <button style={styles.button}>Join</button>
                      </div>
                      <div style={styles.buttonBox}>
                        <button style={styles.button}>View</button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center my-4">
            <div style={styles.buttonBox}>
              <button style={styles.button}>View All Tournaments</button>
            </div>
            <div style={styles.buttonBox}>
              <button style={styles.button}>Create Tournament</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentOptions;
