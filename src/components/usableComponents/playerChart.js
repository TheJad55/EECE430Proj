import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

Chart.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const ChartComponent = ({
  games,
  selectedColumn,
  selectedGame,
  displayBarChart,
  selectedPlayers,
}) => {
  const allSeasonSelected = selectedGame === "all";
  const chartTitle = allSeasonSelected
    ? "All Season Averages"
    : `Game by Game ${
        selectedColumn.charAt(0).toUpperCase() + selectedColumn.slice(1)
      }`;

  const lineChartData = {
    labels: games[0].map((_, index) => `Game ${index + 1}`),
    datasets: [
      {
        data: games[0].map((game) => game[selectedColumn]),
        backgroundColor: "#334155",
        borderColor: "#ff8c00",
        pointBackgroundColor: games[0].map((_, index) =>
          index === parseInt(selectedGame) ? "#ff0000" : "#ffffff"
        ),
        pointBorderColor: games[0].map((_, index) =>
          index === parseInt(selectedGame) ? "#ff6600" : "#334155"
        ),
        pointRadius: games[0].map((_, index) =>
          index === parseInt(selectedGame) ? 6 : 4
        ),
        tension: 0.3,
      },
      ...selectedPlayers.map((playerIndex) => {
        const playerGames = games[playerIndex];
        return {
          data: playerGames.map((game) => game[selectedColumn]),
          backgroundColor: playerIndex === 0 ? "#334155" : "#7C3AED",
          borderColor: playerIndex === 0 ? "#ff8c00" : "#A78BFA",
          pointBackgroundColor: playerGames.map((_, index) =>
            index === parseInt(selectedGame) ? "#ff0000" : "#ffffff"
          ),
          pointBorderColor: playerGames.map((_, index) =>
            index === parseInt(selectedGame) ? "#ff6600" : "#334155"
          ),
          pointRadius: playerGames.map((_, index) =>
            index === parseInt(selectedGame) ? 6 : 4
          ),
          tension: 0.3,
        };
      }),
    ],
  };

  const barChartData = {
    labels: Object.keys(games[0]).map(
      (key) => key.charAt(0).toUpperCase() + key.slice(1)
    ),
    datasets: [
      {
        data: Object.keys(games[0]).map(
          (key) =>
            games.reduce((acc, game) => acc + game[key], 0) / games.length
        ),
        backgroundColor: "#ffa706",
        borderColor: "#ffa500",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "#D3D3D3",
          font: {
            size: 20,
          },
        },
        grid: {
          color: "#5A5A5A",
        },
      },
      y: {
        ticks: {
          color: "#D3D3D3",
          font: {
            size: 20,
          },
          beginAtZero: true,
        },
        grid: {
          color: "#5A5A5A",
        },
        min: 0,
      },
    },
    plugins: {
      title: {
        display: true,
        text: chartTitle,
        color: "#D3D3D3",
        font: {
          size: 24,
        },
      },
      tooltip: {
        enabled: true,
        mode: "nearest",
        intersect: false,
        backgroundColor: "#fff",
        borderColor: "#000",
        borderWidth: 1,
        titleColor: "#000",
        bodyColor: "#000",
        displayColors: false,
        callbacks: {
          title: () => {},
        },
      },
      point: {
        hoverBackgroundColor: "#ff0000",
      },
    },
    spanGaps: true,
  };

  return (
    <div
      className="grid place-items-center shadow-shadowOne"
      style={{
        width: "100%",
        height: "50%",
        position: "relative",
        border: "5px solid #333",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <div
        style={{ position: "relative", paddingBottom: "56.25%", width: "100%" }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          {displayBarChart ? (
            <Bar data={barChartData} options={options} />
          ) : (
            <Line data={lineChartData} options={options} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
