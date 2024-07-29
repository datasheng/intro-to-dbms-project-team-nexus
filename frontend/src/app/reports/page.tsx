"use client";
import React, { useRef } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import subscriptionsData from "../../data/subscriptionsData";
import styles from "../../../styles/ReportsPage.module.css";
import Header from "../../../components/Header/Header"; // Import the Header component
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Reports = () => {
  const reportRef = useRef<HTMLDivElement>(null);
  const totalRevenue = subscriptionsData.reduce((acc, data) => acc + data.revenue, 0).toFixed(2);
  const totalSubscriptions = subscriptionsData.reduce((acc, data) => acc + data.count, 0);

  const chartData = {
    labels: subscriptionsData.map(data => data.month),
    datasets: [
      {
        label: 'Revenue',
        data: subscriptionsData.map(data => data.revenue), // Ensure these are numbers
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Subscriptions',
        data: subscriptionsData.map(data => data.count), // Ensure these are numbers
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const downloadPDF = () => {
    const input = reportRef.current;
    if (input) {
      html2canvas(input).then((canvas: HTMLCanvasElement) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("jobconnect_report.pdf");
      });
    }
  };

  return (
    <>
      <Header />
      <div className={styles.page} ref={reportRef}>
        <h1 className={styles.title}>JobConnect Reports</h1>
        <div className={styles.reportsContainer}>
          <div className={styles.summary}>
            <div className={styles.card}>
              <h2>Total Revenue</h2>
              <p>${totalRevenue}</p>
            </div>
            <div className={styles.card}>
              <h2>Total Subscriptions</h2>
              <p>{totalSubscriptions}</p>
            </div>
          </div>
          <h2 className={styles.subtitle}>Subscriptions by Month</h2>
          <div className={styles.chartContainer}>
            <Bar data={chartData} className={styles.chart} />
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Month</th>
                <th>Year</th>
                <th>Subscriptions</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {subscriptionsData.map((data, index) => (
                <tr key={index}>
                  <td>{data.month}</td>
                  <td>{data.year}</td>
                  <td>{data.count}</td>
                  <td>${data.revenue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className={styles.button} onClick={downloadPDF}>Download Report as PDF</button>
        </div>
      </div>
    </>
  );
};

export default Reports;