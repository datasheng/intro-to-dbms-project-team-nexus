import React from "react";
import styles from "./JobCard.module.css";

type JobCardProps = {
  title: string;
  company: string;
  location: string;
  salary: string;
  onClickApply: () => void;
};

const JobCard: React.FC<JobCardProps> = ({
  title,
  company,
  location,
  salary,
  onClickApply,
}) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.job_title}>{title}</h2>
      <div className={styles.job_info}>
        <p>Company: {company}</p>
        <p>Location: {location}</p>
        <p>Salary: ${salary}</p>
      </div>
      <div>
        <button className={styles.button} onClick={onClickApply}>
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;


