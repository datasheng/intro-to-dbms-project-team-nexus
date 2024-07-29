"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../../../components/Header/Header";
import styles from "../../../../styles/ReviewCandidates.module.css";

const ReviewCandidatesPage: React.FC = () => {
  const searchParams = useSearchParams();
  const jobId = searchParams?.get("jobId");

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState("");

  const candidates = [
    { name: "John Doe", email: "john.doe@example.com", phone: "345-456-7890", resume: "link_to_resume.pdf", currentWorkplace: "ABC Corp" },
    { name: "Jane Smith", email: "jane.smith@example.com", phone: "987-654-3210", resume: "link_to_resume.pdf", currentWorkplace: "XYZ Ltd" },
    { name: "Mike Johnson", email: "mike.johnson@example.com", phone: "555-555-5555", resume: "link_to_resume.pdf", currentWorkplace: "OpenAI" },
  ];

  const handleOpenModal = (candidateName: string) => {
    setSelectedCandidate(candidateName);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email sending logic here
    console.log(`Email sent to ${selectedCandidate}`);
    handleCloseModal();
  };

  useEffect(() => {
    if (!jobId) {
      // Handle the case when jobId is not present
      console.error("Job ID not found in URL parameters");
    }
  }, [jobId]);

  return (
    <div className="pageContent">
      <Header />
      <div className={styles.page}>
        <h1 className={styles.title}>You have {candidates.length} Job Seekers interested in this role!</h1>
        <div className={styles.candidatesContainer}>
          {candidates.map((candidate, index) => (
            <div key={index} className={styles.candidateCard}>
              <p><strong>Name:</strong> {candidate.name}</p>
              <p><strong>Email:</strong> {candidate.email}</p>
              <p><strong>Phone:</strong> {candidate.phone}</p>
              <p><strong>Resume:</strong> <a href={candidate.resume} target="_blank" rel="noopener noreferrer">View Resume</a></p>
              <p><strong>Current Workplace:</strong> {candidate.currentWorkplace}</p>
              <button className={styles.button} onClick={() => handleOpenModal(candidate.name)}>
                Message This Candidate
              </button>
            </div>
          ))}
        </div>
        {modalVisible && (
          <div className={styles.modalContainer}>
            <div className={styles.modal}>
              <h2>Message {selectedCandidate}</h2>
              <form onSubmit={handleSendEmail}>
                <label>
                  Subject
                  <input type="text" required className={styles.input} />
                </label>
                <label>
                  Message
                  <textarea required className={styles.textarea}></textarea>
                </label>
                <div className={styles.button_styles}>
                  <button type="button" className={styles.button} onClick={handleCloseModal}>
                    Close
                  </button>
                  <button type="submit" className={styles.button}>
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCandidatesPage;



