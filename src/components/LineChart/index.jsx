import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const LineChart = ({ cryptoHistory, currenctPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < cryptoHistory?.history.length; i += 1) {
    coinPrice.push(cryptoHistory.history[i].price);
    coinTimestamp.push(cryptoHistory.history[i].timestamp);
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price to USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    // scales: {
    //   y: [
    //     {
    //       ticks: {
    //         beginAtZero: true,
    //       },
    //     },
    //   ],
    // },
  };
  return (
    <>
      <p>{coinName} Price Chart</p>
      <p>{cryptoHistory?.change}</p>
      <p>Currenct Price {currenctPrice}</p>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
