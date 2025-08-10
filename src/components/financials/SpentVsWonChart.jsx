import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const SpentVsWonChart = ({totalSpent,totalWon}) => {
    const labels = ['Spent','Won'];
    const values = [totalSpent,totalWon];

    const data = {
        labels,
        datasets: [
          {
            label: "My dataset",
            data: values,
            backgroundColor: [
              "rgba(255, 205, 135, 0.95)",
              "rgba(191, 64, 0, 0.95)",   
            ],
          },
        ],
      };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom" },
        tooltip: { enabled: true },
      },
    };
    
      return (
       <div className="piechart">
        <h1>Spent Vs Won</h1>
        <Pie data={data} options={options} />
       </div>
      );

}

export default SpentVsWonChart;
