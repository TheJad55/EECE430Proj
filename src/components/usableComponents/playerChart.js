import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

Chart.register(LineElement, CategoryScale, LinearScale, PointElement);

const ChartComponent = () => {
  const data = {
    labels: [
      "May 12",
      "May 13",
      "May 14",
      "May 15",
      "May 16",
      "May 17",
      "May 18",
      "May 19",
      "May 20",
      "May 21",
      "May 22",
      "May 23",
      "May 24",
      "May 25",
      "May 26",
      "May 27",
      "May 28",
      "May 29",
      "May 30",
      "May 31",
    ],
    datasets: [
      {
        data: [
          12, 19, 3, 5, 2, 4, 12, 19, 8, 10, 6, 9, 12, 10, 3, 5, 2, 7, 3, 14,
          12,
        ],
        backgroundColor: "#334155",
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
      },
      y: {
        ticks: {
          color: "#D3D3D3",
          font: {
            size: 20,
          },
        },
      },
    },
    plugins: {
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
          title: () => {}, // Disable the title
          label: (context) => {
            const yValue = context.parsed.y;
            return `y: ${yValue}`;
          },
        },
      },
    },
  };

  return (
    <div
      className="grid place-items-center shadow-shadowOne"
      style={{
        width: "100%",
        height: "80%",
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
          <Line data={data} options={options}></Line>
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
