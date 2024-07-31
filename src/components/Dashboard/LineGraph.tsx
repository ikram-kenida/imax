import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useRef } from "react";
import { Button } from "../ui/button";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Order {
  date: string;
  value: string;
}

interface Product {
  value: string;
}

interface DataResponse {
  orders: Order[];
  products: Product[];
}

export const LineGraph = ({ dataResponse }: { dataResponse: DataResponse }) => {
  const chartRef = useRef<ChartJs | null | any>(null);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    backgroundColor: "#fff",
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  const formattedData = {
    labels: dataResponse.orders.map((item) => item.date),
    datasets: [
      {
        label: "Order",
        data: dataResponse.orders.map((item) => {
          const value = parseFloat(item.value);
          return isNaN(value) ? null : value;
        }),
        borderColor: "rgba(21, 117, 235, 1)",
        backgroundColor: "rgba(21, 117, 235, 0.2)",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: "Products",
        data: dataResponse.products.map((item) => {
          const value = parseFloat(item.value);
          return isNaN(value) ? null : value;
        }),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const handleDownloadImage = () => {
    if (chartRef.current) {
      const chartCanvas = chartRef.current.toBase64Image();
      const link = document.createElement("a");
      link.href = chartCanvas;
      link.download = "chart.png";
      link.click();
    } else {
      console.error("Chart reference is not available for download.");
    }
  };

  return (
    <div className="max-w-full p-5 bg-white rounded-xl h-96 relative">
      <Line ref={chartRef} options={options} data={formattedData} />
      <Button
        onClick={handleDownloadImage}
        className="absolute top-5 end-10 bg-green-600 rounded z-10 py-1 px-2"
      >
        <span className="text-sm text-white font-medium font-['Lato']">
          Save
        </span>
      </Button>
    </div>
  );
};
