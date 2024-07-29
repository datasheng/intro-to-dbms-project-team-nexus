"use client";

import React, { useState } from "react";
import Header from "../../../../components/Header/Header"; // Adjust the path accordingly
import styles from "../../../../styles/RecruiterPostJob.module.css";

const PostJobPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/job_postings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employer_id: 1,  // Replace with actual employer ID
        job_title: title,
        company_name: company,
        location: location,
        salary: salary,
        requirements: experience,
        description: description,
        created_at: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      // Handle success
      console.log("Job posted successfully");
    } else {
      // Handle error
      console.error("Failed to post job");
    }
  };

  return (
    <div className={styles.page}>
      <Header />
      <h1 className={styles.title}>Post a Job</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Job Title
          <input
            className={styles.input}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          Company
          <input
            className={styles.input}
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          Location
          <input
            className={styles.input}
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          Salary
          <input
            className={styles.input}
            type="text"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          Experience Requirements
          <input
            className={styles.input}
            type="text"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          Job Description
          <textarea
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <div className={styles.buttonContainer}>
          <button className={styles.button} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJobPage;





// "use client";

// import React, { useState } from "react";
// import Header from "../../../../components/Header/Header"; 
// import styles from "../../../../styles/RecruiterPostJob.module.css";

// const PostJobPage: React.FC = () => {
//   const [title, setTitle] = useState("");
//   const [company, setCompany] = useState("");
//   const [location, setLocation] = useState("");
//   const [salary, setSalary] = useState("");
//   const [experience, setExperience] = useState("");
//   const [description, setDescription] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log({ title, company, location, salary, experience, description });
//   };

//   return (
//     <div className={styles.page}>
//       <Header />
//       <h1 className={styles.title}>Post a Job</h1>
//       <form className={styles.form} onSubmit={handleSubmit}>
//         <label className={styles.label}>
//           Job Title
//           <input
//             className={styles.input}
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </label>
//         <label className={styles.label}>
//           Company
//           <input
//             className={styles.input}
//             type="text"
//             value={company}
//             onChange={(e) => setCompany(e.target.value)}
//           />
//         </label>
//         <label className={styles.label}>
//           Location
//           <input
//             className={styles.input}
//             type="text"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//           />
//         </label>
//         <label className={styles.label}>
//           Salary
//           <input
//             className={styles.input}
//             type="text"
//             value={salary}
//             onChange={(e) => setSalary(e.target.value)}
//           />
//         </label>
//         <label className={styles.label}>
//           Experience Requirements
//           <input
//             className={styles.input}
//             type="text"
//             value={experience}
//             onChange={(e) => setExperience(e.target.value)}
//           />
//         </label>
//         <label className={styles.label}>
//           Job Description
//           <textarea
//             className={styles.textarea}
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </label>
//         <div className={styles.buttonContainer}>
//           <button className={styles.button} type="submit">
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PostJobPage;




