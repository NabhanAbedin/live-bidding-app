import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Title, Filler} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Title, Filler);

const CurrencyBoughtChart = () => {
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    
}