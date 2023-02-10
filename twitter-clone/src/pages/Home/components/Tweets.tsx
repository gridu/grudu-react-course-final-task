import React from "react";
import { useSelector } from "react-redux";
import { TweetProps } from "./Tweet";

import Tweet from "./Tweet";

const Tweets = () => {
  const tweets = useSelector((state: any) => state.tweets);

  return (
    <div className="tweets-container" style={{marginTop: '2.875rem'}}>
      {tweets.map((tweet: TweetProps) => (
        <Tweet key={tweet.id} author_id={tweet.author_id} text={tweet.text} id={tweet.id} />
      ))}
    </div>
  );
};

export default Tweets;