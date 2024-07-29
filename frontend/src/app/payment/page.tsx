"use client";

import { NextPage } from "next";
import Header from "../../../components/Header/Header";
import StripeContext from "../../contexts/StripeContext";
import CheckoutForm from "../../../components/CheckoutForm";
import styles from "../../../styles/PaymentPage.module.css";

const PaymentPage: NextPage = () => {
  return (
    <>
      <Header />
      <div className={styles.page}>
        <h1 className={styles.h1}>Payment Page</h1>
        <div className={styles.form}>
          <StripeContext>
            <CheckoutForm />
          </StripeContext>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;