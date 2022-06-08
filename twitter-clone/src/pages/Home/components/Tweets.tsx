import React from "react";
import styled from "@emotion/styled";

import Tweet, { TweetProps } from "./Tweet";

interface TweetsProps {
  tweets: TweetProps[];
}

const Tweets = ({tweets = []}: TweetsProps) => (
  <div className="tweets-container" style={{marginTop: '2.875rem'}}>
    {tweets.map((tweet) => (
      <Tweet key={tweet.id} author_id={tweet.author_id} text={tweet.text} id={tweet.id} />
    ))}
  </div>
);

export default Tweets;