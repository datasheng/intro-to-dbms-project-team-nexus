"use client";

import React, { useState } from "react";
import Header from "../../../components/Header/Header";
import styles from "../../../styles/Messages.module.css";

const MessagesPage: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [replyText, setReplyText] = useState("");

  const messages = [
    {
      id: 1,
      sender: "John Doe",
      subject: "Interview Confirmation",
      date: "2024-08-15",
      body: "Your interview is scheduled for 10:00 AM on August 15, 2024.",
    },
    {
      id: 2,
      sender: "Jane Smith",
      subject: "Job Application Status",
      date: "2024-08-14",
      body: "We have received your application and will get back to you soon.",
    },
    {
      id: 3,
      sender: "Recruiter",
      subject: "New Job Opportunity",
      date: "2024-08-13",
      body: "We have a new job opportunity that matches your profile. Please check your dashboard for more details.",
    },
  ];

  const openReplyModal = (message: any) => {
    setSelectedMessage(message);
    setIsReplyModalOpen(true);
  };

  const closeReplyModal = () => {
    setIsReplyModalOpen(false);
    setReplyText("");
  };

  const handleSendReply = () => {
    console.log("Reply sent:", replyText);
    closeReplyModal();
  };

  return (
    <div className={styles.page}>
      <Header />
      <h1 className={styles.title}>Inbox</h1>
      <div className={styles.inbox}>
        {messages.map((message) => (
          <div key={message.id} className={styles.messageCard}>
            <div className={styles.messageHeader}>
              <p><strong>From:</strong> {message.sender}</p>
              <p><strong>Subject:</strong> {message.subject}</p>
              <p><strong>Date:</strong> {message.date}</p>
            </div>
            <p>{message.body}</p>
            <button className={styles.replyButton} onClick={() => openReplyModal(message)}>
              Reply
            </button>
          </div>
        ))}
      </div>
      {isReplyModalOpen && (
        <div className={styles.modalContainer}>
          <div className={styles.modal}>
            <h2>Reply to {selectedMessage.sender}</h2>
            <textarea
              className={styles.textarea}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply here..."
            />
            <div className={styles.buttonGroup}>
              <button className={styles.button} onClick={closeReplyModal}>
                Cancel
              </button>
              <button className={styles.button} onClick={handleSendReply}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;

