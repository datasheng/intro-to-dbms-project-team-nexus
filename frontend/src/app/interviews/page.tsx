"use client";

import React from "react";
import Header from "../../../components/Header/Header";
import styles from "../../../styles/Interviews.module.css";

const InterviewsPage: React.FC = () => {
  const interviews = [
    {
      name: "John Doe",
      date: "2024-08-15",
      time: "10:00 AM",
      zoomLink: "https://zoom.us/j/1234567890",
    },
    {
      name: "Jane Smith",
      date: "2024-08-16",
      time: "2:00 PM",
      zoomLink: "https://zoom.us/j/0987654321",
    },
  ];

  return (
    <div className={styles.page}>
      <Header />
      <h1 className={styles.title}>Upcoming Interviews</h1>
      <div className={styles.interviewsList}>
        {interviews.map((interview, index) => (
          <div key={index} className={styles.interviewCard}>
            <p>
              You have an upcoming interview with <strong>{interview.name}</strong> on{" "}
              <strong>{interview.date}</strong> at <strong>{interview.time}</strong>.
            </p>
            <p>
              Zoom Link: <a href={interview.zoomLink} target="_blank" rel="noopener noreferrer">{interview.zoomLink}</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewsPage;
