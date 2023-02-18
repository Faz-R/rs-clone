import 'chart.js/auto';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

interface IDiagram {
  labels: string[];
  data: number[];
}

interface IPie {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    hoverBackgroundColor: string[];
    borderColor: string;
    borderWidth: number;
  }[];
}

const Diagram = ({ labels, data }: IDiagram) => {
  const [dataDiagram, setDataDiagram] = useState<IPie>({
    labels: [],
    datasets: [],
  });

  const darkDiagram = '#282828';
  const lightDiagram = '#ffffff';
  const [diagramColor, setDiagramColor] = useState(lightDiagram);

  useEffect(() => {
    if (document.documentElement.getAttribute('theme') === 'light-theme') {
      setDiagramColor(lightDiagram);
    }
    if (document.documentElement.getAttribute('theme') === 'dark-theme') {
      setDiagramColor(darkDiagram);
    }

    const pieChartData: IPie = {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            '#ff7425',
            '#ff7c31',
            '#ff7e34',
            '#ff823a',
            '#ff8641',
            '#ff8b48',
            '#ff904f',
            '#ff9454',
            '#ff9759',
            '#ff9b60',
            '#ff9f66',
            '#ffa46e',
            '#ffa875',
            '#ffae7f',
            '#ffb387',
            '#ffba93',
            '#ffc19e',
            '#ffc8a9',
            '#ffceb2',
            '#ffd4bb',
            '#ffd9c3',
          ],
          hoverBackgroundColor: ['transparent'],
          borderColor: `#ffffff`,
          borderWidth: 2,
        },
      ],
    };
    setDataDiagram(pieChartData);
  }, [labels, data, diagramColor]);

  const diaChartOptions = {
    resposive: true,
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
          size: 16,
        },
        callbacks: {
          label(context: { label: string; parsed: number }) {
            context.label = `${context.label}: ${context.parsed.toFixed(1)}%`;
            return context.label;
          },
        },
      },
    },
  };
  return <Doughnut width={130} height={50} data={dataDiagram} options={diaChartOptions} />;
};
export default Diagram;
