import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from '@emotion/styled';

import TopBar from "./components/TopBar";
import Tweets from "./components/Tweets";
import TweetForm from "./components/TweetForm";

import { FetchTweets } from "../../redux/tweets/actions";

import * as URLS from '../../constants/urls';

const Container = styled.div`
  width: 90%;
  max-width: 780px;
  margin: 0 auto;
`;

const Home = () => {
  FetchTweets();

  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.loggedIn) {
      navigate(URLS.LOGIN, { replace: true });
    }
  });
  
  return (
    <>
      <TopBar/>

      <Container>
        <TweetForm />
        <Tweets />
      </Container>
`
    </>
  )
};

export default Home;