"use client";
import React, { useState } from "react";
import styles from "../JobApplicationModal/JobApplicationModal.module.css";

type JobApplicationProps = {
  onClose: () => void;
  onSubmit: () => void;
};

const JobApplicationModal: React.FC<JobApplicationProps> = ({
  onClose,
  onSubmit,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleCoverLetterChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCoverLetter(e.target.value);
  };

  const handleResumeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!resume) {
      alert("Please upload your resume.");
      return;
    }

    // Handle form submission logic here
    onSubmit();
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <h1>Job Application Form</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputsContainer}>
            <p>First Name</p>
            <label htmlFor="firstName">
              <input
                className={styles.input}
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </label>

            <p>Last Name</p>
            <label htmlFor="lastName">
              <input
                className={styles.input}
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </label>

            <p>Email</p>
            <label htmlFor="email">
              <input
                className={styles.input}
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
            </label>

            <p>Phone Number</p>
            <label htmlFor="phoneNumber">
              <input
                className={styles.input}
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
            </label>

            <p>Cover Letter</p>
            <label htmlFor="coverLetter">
              <textarea
                className={styles.textarea}
                id="coverLetter"
                name="coverLetter"
                value={coverLetter}
                onChange={handleCoverLetterChange}
              />
            </label>

            <p>Resume</p>
            <label htmlFor="resume" className={styles.customFileButton}>
              <input
                className={styles.resume_input}
                type="file"
                id="resume"
                name="resume"
                onChange={handleResumeFileChange}
              />
              <span>Upload Resume</span>
            </label>
          </div>
          <div className={styles.button_styles}>
            <button type="button" className={styles.button} onClick={onClose}>
              Close
            </button>
            <button className={styles.button} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationModal;

