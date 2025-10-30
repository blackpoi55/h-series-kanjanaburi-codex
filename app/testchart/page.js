"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { Chart as ChartJS, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useRef, useState } from 'react';

// ใช้ Chart.js สำหรับตัวกราฟ
ChartJS.register(Title, Tooltip, Legend);

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: 'GeeksforGeeks Bar Chart',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const BarChart = () => {
  const chartRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const handlePreview = () => {
    if (chartRef.current) {
      const canvas = chartRef.current.canvas;  // เข้าถึง canvas โดยตรงจาก chartRef.current
      const image = canvas.toDataURL('image/png'); // สร้าง Base64 จาก Canvas
      console.log("image",image)
      setImageSrc(image);
    }
  };

  return (
    <div>
      <h1>Example 2: Bar Chart</h1>
      <div style={{ width: '700px', height: '700px' }}>
        <Bar ref={chartRef} data={data} />
      </div>
      <button onClick={handlePreview}>พรีวิวกราฟ</button>
      {imageSrc && (
        <div>
          <h2>พรีวิวกราฟ</h2>
          <img src={imageSrc} alt="Bar Chart Preview" style={{ width: '700px' }} />
        </div>
      )}
    </div>
  );
};

export default BarChart;
