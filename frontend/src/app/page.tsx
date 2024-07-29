import { NextPage } from "next";
import Header from "../../components/Header/Header";
import Link from "next/link";
import { FaCrown } from "react-icons/fa";
import SpinningGlobe from "../components/SpinningGlobe";
import styles from "../../styles/HomePage.module.css";

const HomePage: NextPage = () => {
  return (
    <>
      <Header />
      <div className={styles.page}>
        <div className={styles.textContainer}>
          <h1 className={styles.h1}>Welcome to JobConnect</h1>
          <p className={styles.p}>Connecting you with opportunities!</p>
        </div>
        <div className={styles.globeContainer}>
          <SpinningGlobe />
        </div>
        <Link href="/joblist">
          <button className={`${styles.button} ${styles.buttonLeft}`}>JobSeeker</button>
        </Link>
        <Link href="/recruiter/dashboard">
          <button className={`${styles.button} ${styles.buttonRight}`}>Recruiters</button>
        </Link>
        <Link href="/premium">
          <button className={styles.premiumButton}>
            <FaCrown className={styles.icon} /> JobConnect Premium
          </button>
        </Link>
      </div>
    </>
  );
};

export default HomePage;






























