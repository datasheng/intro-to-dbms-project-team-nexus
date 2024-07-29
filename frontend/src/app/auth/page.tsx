"use client";

import { NextPage } from "next";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from '../../../styles/AuthPage.module.css';

// Define the AuthPayload type
type AuthPayload = {
  email: string;
  password: string;
  user_type?: string;
};

const AuthPage: NextPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('job_seeker'); // default user type
  const router = useRouter();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isLogin ? "http://127.0.0.1:8000/login" : "http://127.0.0.1:8000/users";

    const payload: AuthPayload = {
      email: email,
      password: password,
    };

    if (!isLogin) {
      payload['user_type'] = userType;
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log(isLogin ? "Login successful" : "Signup successful");
      alert(isLogin ? "Login successful" : "Signup successful");
      router.push("/"); // Redirect to home page after successful login or signup
    } else {
      alert(isLogin ? "Login failed" : "Signup failed");
    }
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>{isLogin ? "Login" : "Sign Up"}</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isLogin && (
            <select
              className={styles.input}
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="job_seeker">Job Seeker</option>
              <option value="job_offerer">Job Offerer</option>
            </select>
          )}
          <button className={styles.button} type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <button className={styles.toggleButton} onClick={toggleAuthMode}>
          {isLogin ? "Switch to Sign Up" : "Switch to Login"}
        </button>
      </div>
      <button className={styles.homeButton} onClick={handleGoHome}>
        Return to Home
      </button>
    </div>
  );
};

export default AuthPage;




// "use client";

// import { NextPage } from "next";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import styles from '../../../styles/AuthPage.module.css';

// const AuthPage: NextPage = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const router = useRouter();

//   const toggleAuthMode = () => {
//     setIsLogin(!isLogin);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     // Mock API call
//     const mockResponse = { ok: true };

//     if (mockResponse.ok) {
//       console.log(isLogin ? "Login successful" : "Signup successful");
//       alert(isLogin ? "Login successful" : "Signup successful");
//       router.push("/"); // Redirect to home page after successful login or signup
//     } else {
//       alert(isLogin ? "Login failed" : "Signup failed");
//     }
//   };

//   const handleGoHome = () => {
//     router.push("/");
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.card}>
//         <h1 className={styles.title}>{isLogin ? "Login" : "Sign Up"}</h1>
//         <form className={styles.form} onSubmit={handleSubmit}>
//           <input
//             className={styles.input}
//             type="text"
//             placeholder="Username"
//           />
//           <input
//             className={styles.input}
//             type="password"
//             placeholder="Password"
//           />
//           <button className={styles.button} type="submit">
//             {isLogin ? "Login" : "Sign Up"}
//           </button>
//         </form>
//         <button className={styles.toggleButton} onClick={toggleAuthMode}>
//           {isLogin ? "Switch to Sign Up" : "Switch to Login"}
//         </button>
//       </div>
//       <button className={styles.homeButton} onClick={handleGoHome}>
//         Return to Home
//       </button>
//     </div>
//   );
// };

// export default AuthPage;







