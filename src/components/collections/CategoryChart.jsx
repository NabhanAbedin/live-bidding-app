import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ categoryData }) => {
  const labels = [
    "ELECTRONICS",
    "FASHION_ACCESSORIES",
    "HOME_GARDEN",
    "ART_ANTIQUES",
    "COLLECTIBLES_MEMORABILIA",
    "JEWELRY_WATCHES",
    "VEHICLES_AUTO",
    "SPORTS_MEMORABILIA",
    "TOYS_HOBBIES",
    "BOOKS_MEDIA",
    "TICKETS_EXPERIENCES",
    "INDUSTRIAL_EQUIPMENT"
  ];

  const dataObj = categoryData || {};

  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#C9CBCF",
    "#8DD17E",
    "#E377C2",
    "#7F7F7F",
    "#BCBD22",
    "#17BECF"
  ];

  const datasetValues = labels.map(label => dataObj[label] || 0);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Amount Spent",
        data: datasetValues,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Spending by Category",
        font: {
          family: "Poppins",
          size: 18, 
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 30
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { display: false },
      },
      y: {
        grid: { display: false },
      },
    },
  };

  return <Bar data={chartData} options={options} style={{ width: '100%', height: '100%' }} />;
};

export default BarChart;