"use client";

import React, { useState } from "react";
import Header from "../../../components/Header/Header"; 
import styles from "../../../styles/ContactUs.module.css";

const ContactUsPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    console.log({ name, email, message });
  };

  return (
    <div className="pageContent">
      <Header />
      <div className={styles.page}>
        <h1 className={styles.title}>Contact Us</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Name
            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className={styles.label}>
            Email
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className={styles.label}>
            Message
            <textarea
              className={styles.textarea}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <div className={styles.buttonContainer}>
            <button className={styles.button} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUsPage;
