"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../../../../components/Header/Header";
import styles from "../../../../styles/RecruiterReviewListings.module.css";

interface Job {
  id: number;
  job_title: string;
  company_name: string;
  location: string;
  salary: string;
  requirements: string;
  description: string;
}

const RecruiterReviewListings: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch("http://127.0.0.1:8000/job_postings", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      } else {
        console.error("Failed to fetch job postings");
      }
    };

    fetchJobs();
  }, []);

  const handleDeleteListing = async (jobId: number) => {
    console.log("Delete listing for job:", jobId);
    // Implement delete functionality here
  };

  return (
    <div className={styles.page}>
      <Header />
      <h1 className={styles.title}>Your Job Listings</h1>
      <div className={styles.jobList}>
        {jobs.map((job) => (
          <div key={job.id} className={styles.jobCard}>
            <h2>{job.job_title}</h2>
            <p>Company: {job.company_name}</p>
            <p>Location: {job.location}</p>
            <p>Salary: ${job.salary}</p>
            <div className={styles.buttonContainer}>
              <Link href={`/recruiter/review?jobId=${job.id}`}>
                <button className={styles.button}>Review Candidates</button>
              </Link>
              <button
                className={styles.button}
                onClick={() => handleDeleteListing(job.id)}
              >
                Delete Listing
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruiterReviewListings;





// "use client";

// import React from "react";
// import Link from "next/link";
// import Header from "../../../../components/Header/Header";
// import styles from "../../../../styles/RecruiterReviewListings.module.css";

// const sampleJobs = [
//   {
//     id: 1,
//     title: "Software Engineer",
//     company: "Google",
//     location: "New York",
//     salary: "157,000",
//   },
//   {
//     id: 2,
//     title: "Marketing Specialist",
//     company: "Uniqlo",
//     location: "Los Angeles",
//     salary: "77,000",
//   },
//   {
//     id: 3,
//     title: "Data Scientist",
//     company: "OpenAI",
//     location: "San Francisco",
//     salary: "127,000",
//   },
// ];

// const RecruiterReviewListings: React.FC = () => {
//   const handleDeleteListing = (jobId: number) => {
//     console.log("Delete listing for job:", jobId);
//   };

//   return (
//     <div className={styles.page}>
//       <Header />
//       <h1 className={styles.title}>Your Job Listings</h1>
//       <div className={styles.jobList}>
//         {sampleJobs.map((job) => (
//           <div key={job.id} className={styles.jobCard}>
//             <h2>{job.title}</h2>
//             <p>Company: {job.company}</p>
//             <p>Location: {job.location}</p>
//             <p>Salary: ${job.salary}</p>
//             <div className={styles.buttonContainer}>
//               <Link href={`/recruiter/review?jobId=${job.id}`}>
//                 <button className={styles.button}>
//                   Review Candidates
//                 </button>
//               </Link>
//               <button className={styles.button} onClick={() => handleDeleteListing(job.id)}>
//                 Delete Listing
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RecruiterReviewListings;



