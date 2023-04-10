import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const DonutChart = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const chart = new Chart(canvas, {
            type: "doughnut",
            data: {
                labels: ["Red", "Blue", "Yellow"],
                datasets: [
                    {
                        label: "# of Votes",
                        data: [12, 19, 3],
                        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                        borderWidth: 1,
                    },
                ],
            },
        });

        return () => {
            chart.destroy();
        };
    }, []);

    return <canvas ref={canvasRef} />;
};

export default DonutChart;
