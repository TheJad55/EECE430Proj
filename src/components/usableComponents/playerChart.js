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
    labels: ["May 12", "May 13", "May 14", "May 15", "May 16", "May 17"],
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "#334155",
        borderColor: "rgba(255, 99, 132, 1)",
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
            size: 25,
            family: "Roboto",
          },
        },
      },
      y: {
        ticks: {
          color: "#D3D3D3",
          font: {
            size: 25,
            family: "Roboto",
          },
        },
      },
    },
  };

  return (
    <div
      className="bg-gray-700"
      style={{
        width: "100%",
        height: "80%",
        marginLeft: "20px",
        marginTop: "20px",
        position: "relative",
        border: "5px solid #333",
        borderRadius: "50px",
        padding: "20px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ position: "relative", paddingBottom: "56.25%" }}>
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
