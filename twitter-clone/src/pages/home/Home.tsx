import React from "react";
import GetTweets from "../../util/GetTweets";
import TweetInput from "./components/TweetInput";
import TweetsFeed from "./components/TweetsFeed";
import Container from "@mui/material/Container";

export default function Home() {
  GetTweets();

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
