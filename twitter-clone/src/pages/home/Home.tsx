import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as paths from "../../Constants";
import getTweets from "../../util/GetTweets";
import styles from "./Home.module.css";

export default function Home() {
  getTweets();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);
  console.info(user);

  const navigateToLogin = () => {
    navigate(paths.loginUrl);
  };

  const navigateToSignup = () => {
    navigate(paths.signUpUrl);
  };

  return (
    <div>
      <div>
        <h1>Welcome Home</h1>
        <div>
          <button onClick={navigateToLogin}>To Login Page</button>
          <button onClick={navigateToSignup}>To Sign Up Page</button>
        </div>
      </div>
      <div className={styles.container}></div>
    </div>
  );
}
