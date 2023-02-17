import 'chart.js/auto';
import { useEffect, useState } from 'react';
import { Bar, Chart } from 'react-chartjs-2';

interface IBars {
  labels: string[];
  data: number[];
  size: number;
  color: string;
  direction: string;
}

interface IChartBar {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    hoverBackgroundColor: string[];
    borderColor: string;
    borderWidth: number;
    borderSkipped: boolean;
  }[];
}

const Bars = ({ labels, data, size, color, direction }: IBars) => {
  const [dataBar, setDataBar] = useState<IChartBar>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const barChartData = {
      labels,
      datasets: [
        {
          data,
          backgroundColor: ['#ff7425'],
          hoverBackgroundColor: ['#ffae7f'],
          borderColor: `#ff7425`,
          borderWidth: 0,
          borderSkipped: false,
        },
      ],
    };
    setDataBar(barChartData);
  }, [labels, data]);

  const barChartOptions = {
    resposive: true,
    indexAxis: `${direction}`,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        titleSpacing: 0,
        titleMarginBottom: 0,
        displayColors: false,
        intersect: false,
        caretSize: 8,
        titleFont: {
          family: 'Arimo, sans-serif',
          size: 0,
        },
        padding: 10,
        bodyFont: {
          family: 'Arimo, sans-serif',
          size: `${size}`,
        },
        callbacks: {
          label(context: { label: string; formattedValue: number }) {
            context.label = `${context.label}: ${context.formattedValue}`;
            return context.label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
        },
        ticks: {
          font: { size: `${size}`, family: 'Arimo, sans-serif', color: `${color}` },
        },
      },
      y: {
        ticks: {
          font: { size: `${size}`, family: 'Arimo, sans-serif', color: `${color}` },
        },
      },
    },
  };
  return <Bar data={dataBar} options={barChartOptions} />;
};
export default Bars;
