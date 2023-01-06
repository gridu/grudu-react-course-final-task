import React from "react";
import { useSelector } from "react-redux";
import GetTweets from "../../util/GetTweets";
import styles from "./Home.module.css";
import TweetInput from "./components/TweetInput";
import TweetsFeed from "./components/TweetsFeed";
import { User } from "../../redux/User";

export default function Home() {
  GetTweets();
  const user: User = useSelector((state: any) => state.user);
  console.info(user);

  return (
    <div>
      <div>
        <TweetInput />
        <TweetsFeed />
      </div>
      <div className={styles.container}></div>
    </div>
  );
}
