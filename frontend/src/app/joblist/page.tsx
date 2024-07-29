"use client";

import { NextPage } from "next";
import JobCard from "../../../components/JobCard/JobCard";
import Header from "../../../components/Header/Header";
import styles from "../../../styles/joblist/joblist.module.css";
import JobApplicationModal from "../../../components/JobApplicationModal/JobApplicationModal";
import { useState } from "react";

const JobListPage: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnClose = () => {
    setIsModalOpen(false);
  };

  // TODO:
  const handleOnSubmit = async () => {};

  const dummyJobs = [
    {
      title: "Software Engineer",
      company: "Google",
      location: "New York",
      salary: "157,000",
    },
    {
      title: "Marketing Specialist",
      company: "Uniqlo",
      location: "Los Angeles",
      salary: "77,000",
    },
    {
      title: "Data Scientist",
      company: "OpenAI",
      location: "San Francisco",
      salary: "127,000",
    },
    {
      title: "Software Engineer",
      company: "Google",
      location: "New York",
      salary: "157,000",
    },
    {
      title: "Marketing Specialist",
      company: "Uniqlo",
      location: "Los Angeles",
      salary: "77,000",
    },
    {
      title: "Data Scientist",
      company: "OpenAI",
      location: "San Francisco",
      salary: "127,000",
    },
  ];

  return (
    <div className={styles.page}>
      <Header />
      <h1 style={{ margin: "2rem", marginBottom: "none", fontWeight: 5000 }}>
        Job Listings
      </h1>
      <div className={styles.job_container}>
        {dummyJobs.map((job) => (
          <div key={Math.random()} className={styles.jobcard}>
            <JobCard
              title={job.title}
              company={job.company}
              location={job.location}
              salary={job.salary}
              onClickApply={() => setIsModalOpen(true)}
            />
          </div>
        ))}
      </div>
      {isModalOpen && (
        <JobApplicationModal
          onClose={handleOnClose}
          onSubmit={handleOnSubmit}
        />
      )}
    </div>
  );
};

export default JobListPage;

