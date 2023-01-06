import React from "react";
import { useSelector } from "react-redux";
import TweetContainer from "./TweetContainer";
import { Tweet } from "../../../redux/Tweets";

export default function TweetsFeed() {
  const tweets = useSelector((state: any) => state.tweets);

  return (
    <div className="tweets-container" style={{ marginTop: "2.875rem" }}>
      {tweets.map((tweet: Tweet) => (
        <TweetContainer
          key={tweet.id}
          author_id={tweet.author_id}
          text={tweet.text}
          id={tweet.id}
        />
      ))}
    </div>
  );
}
