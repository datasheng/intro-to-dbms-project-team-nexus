"use client";

import React from "react";
import Header from "../../../components/Header/Header"; 
import styles from "../../../styles/AboutUs.module.css";

const AboutUsPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <Header />
      <h1 className={styles.title}>About Us</h1>
      <div className={styles.content}>
        <p>
          Welcome to JobConnect! Our mission is to bridge the gap between job seekers and employers, making the job market more accessible and less intimidating for everyone.
        </p>
        <p>
          Whether you're a recent graduate, a mid-career professional, or an executive, JobConnect offers the tools and resources you need to showcase your skills, experience, and career aspirations.
        </p>
        <p>
          For employers, JobConnect provides efficient and effective talent discovery and hiring solutions. Our advanced search algorithms and personalized recommendations ensure that you find the right talent to meet your job requirements.
        </p>
        <p>
          We are committed to enhancing the hiring experience for both job seekers and employers. Thank you for choosing JobConnect as your trusted partner in career development and talent acquisition.
        </p>
      </div>
    </div>
  );
};

export default AboutUsPage;
