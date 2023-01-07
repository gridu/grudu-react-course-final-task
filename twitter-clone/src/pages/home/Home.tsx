import React from "react";
import { useSelector } from "react-redux";
import GetTweets from "../../util/GetTweets";
import TweetInput from "./components/TweetInput";
import TweetsFeed from "./components/TweetsFeed";
import { User } from "../../redux/User";
import { Container } from "@mui/material";

export default function Home() {
  GetTweets();
  const user: User = useSelector((state: any) => state.user);
  console.info(user);

  return (
    <Container
      sx={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <TweetInput />
      <TweetsFeed />
    </Container>
  );
}
