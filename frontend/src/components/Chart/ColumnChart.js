import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const data = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
    datasets: [
        {
            label: "Tiền thu được",
            data: [100, 200, 300, 400, 500, 600],
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
        },
        {
            label: "Số lượng khách mới",
            data: [10, 20, 30, 40, 50, 60],
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
        },
        {
            label: "Hàng tồn kho",
            data: [5, 10, 15, 20, 25, 30],
            backgroundColor: "rgba(255, 206, 86, 0.2)",
            borderColor: "rgba(255, 206, 86, 1)",
            borderWidth: 1,
        },
    ],
};

const options = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};
const ColumnChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef && chartRef.current) {
            const chart = new Chart(chartRef.current, {
                type: "bar",
                data: data,
                options: options,
            });
        }
    }, [chartRef]);

    return <canvas ref={chartRef} />;
};

export default ColumnChart;
