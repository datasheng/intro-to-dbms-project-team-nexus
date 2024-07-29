import React from "react";
import Link from "next/link";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <div className={styles.header_container}>
      <div className={styles.left_side}>
        <Link href="/" className={styles.nav_link}>
          <h1 className={styles.logo}>JobConnect</h1>
        </Link>

        <nav>
          <ul className={styles.nav}>
            <li>
              <Link href="/messages" className={styles.nav_link}>
                Messages
              </Link>
            </li>
            <li>
              <Link href="/interviews" className={styles.nav_link}>
                Interviews
              </Link>
            </li>
            <li>
              <Link href="/about" className={styles.nav_link}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className={styles.nav_link}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.right_side}>
        <div className={styles.button_styles}>
          <Link href="/auth">
            <button className={styles.button}>Log in</button>
          </Link>

          <Link href="/auth">
            <button className={styles.button}>Sign up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;



