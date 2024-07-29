import { NextPage } from "next";
import Header from "../../../components/Header/Header";
import Link from "next/link";
import styles from "../../../styles/PremiumPage.module.css";
import { FaCrown } from "react-icons/fa";

const PremiumPage: NextPage = () => {
  return (
    <>
      <Header />
      <div className={styles.page}>
        <h1 className={styles.h1}>Upgrade to the full JobConnect experience!</h1>
        <p className={styles.p}>With JobConnect Premium, you can:</p>
        <ul className={styles.list}>
          <li>- Post unlimited listings as a recruiter</li>
          <li>- Apply to unlimited jobs as a job seeker</li>
          <li>- Schedule unlimited interviews</li>
          <li>- Showcase your profile on the premium page, gaining more exposure</li>
          <li>- Get personalized tips from JobConnect!</li>
        </ul>
        <p className={styles.p}>For $14.99/month!</p>
        <Link href="/payment">
          <button className={styles.button}>
            Upgrade to Premium <FaCrown className={styles.crownIcon} />
          </button>
        </Link>
      </div>
    </>
  );
};

export default PremiumPage;