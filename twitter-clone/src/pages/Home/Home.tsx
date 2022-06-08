import React, { useEffect, useState } from "react";
import styled from '@emotion/styled';
import axios from "axios";

import TopBar from "./components/TopBar";
import Tweets from "./components/Tweets";
import TweetForm from "./components/TweetForm";

import { TWEETS_API } from "../../constants/urls";

const Container = styled.div`
  width: 90%;
  max-width: 780px;
  margin: 0 auto;
`

const Home = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    axios.get(TWEETS_API)
      .then((res) => {
        console.log(res.status, res.statusText);
        setTweets(res.data ?? []);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);
  
  console.log({tweets})

  return (
    <>
      <TopBar userFullName="John Smith"/>

      <Container>
        <TweetForm />
        <Tweets tweets={tweets} />
      </Container>
`
    </>
  )
};

export default Home;