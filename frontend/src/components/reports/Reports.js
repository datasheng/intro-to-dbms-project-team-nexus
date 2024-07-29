"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import subscriptionsData from "../../data/subscriptionsData";
import styles from "./Reports.module.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Reports = () => {
  const totalRevenue = subscriptionsData.reduce((acc, data) => acc + data.revenue, 0).toFixed(2);
  const totalSubscriptions = subscriptionsData.reduce((acc, data) => acc + data.count, 0);

  const chartData = {
    labels: subscriptionsData.map(data => data.month),
    datasets: [
      {
        label: 'Revenue',
        data: subscriptionsData.map(data => data.revenue.toFixed(2)),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Subscriptions',
        data: subscriptionsData.map(data => data.count),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.reportsContainer}>
      <h1>JobConnect Reports</h1>
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
      <h2>Subscriptions by Month</h2>
      <Bar data={chartData} />
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
    </div>
  );
};

export default Reports;
