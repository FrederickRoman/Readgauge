import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { deepPurple, orange } from "@mui/material/colors";
import { Box } from "@mui/material";

interface Props {
  predProbs: number[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
    },
  },
  scales: {
    x: {
      title: {
        color: deepPurple[800],
        display: true,
        text: "Number of syllables",
      },
      ticks: {
        font: {
          size: 20,
        },
      },
    },
    y: {
      title: {
        color: deepPurple[800],
        display: true,
        text: "Probability %",
      },
      ticks: {
        font: {
          size: 20,
        },
      },
    },
  },
} as const;

function SyllablesPredChart(props: Props): JSX.Element {
  const { predProbs } = props;
  const chartData = {
    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    datasets: [
      {
        label: "Predictions",
        data: predProbs.map((prob) => 100 * prob),
        borderColor: deepPurple[800],
        backgroundColor: orange[200],
      },
    ],
  };
  return (
    <Box width="min(80vw, 640px)">
      <Line options={chartOptions} data={chartData} />
    </Box>
  );
}

export default SyllablesPredChart;
