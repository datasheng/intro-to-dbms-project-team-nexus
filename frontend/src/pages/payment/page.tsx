import { NextPage } from "next";
import StripeContext from "../../contexts/StripeContext";
import CheckoutForm from "../../../components/CheckoutForm";
import styles from "../../../styles/PaymentPage.module.css";

const PaymentPage: NextPage = () => {
  return (
    <div className={styles.page}>
      <h1>Payment Page</h1>
      <StripeContext>
        <CheckoutForm />
      </StripeContext>
    </div>
  );
};

export default PaymentPage;