"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Header from "../../../../components/Header/Header"; // Ensure the correct path
import styles from "../../../../styles/RecruiterDashboard.module.css";

const RecruiterDashboard: React.FC = () => {
  const router = useRouter();

  const handleReviewListings = () => {
    router.push("/recruiter/review-listings");
  };

  const handleCreateListing = () => {
    router.push("/recruiter/post-job");
  };

  return (
    <div className={styles.page}>
      <Header />
      <h1 className={styles.title}>Recruiter Dashboard</h1>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handleReviewListings}>
          Review Your Recent Job Listings
        </button>
        <button className={styles.button} onClick={handleCreateListing}>
          Create a New Job Listing
        </button>
      </div>
    </div>
  );
};

export default RecruiterDashboard;




