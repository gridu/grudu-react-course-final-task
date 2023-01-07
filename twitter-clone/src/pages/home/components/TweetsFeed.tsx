import React from "react";
import { useSelector } from "react-redux";
import TweetContainer from "./TweetContainer";
import { Tweet } from "../../../redux/Tweets";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

export default function TweetsFeed() {
  const tweets: Tweet[] = useSelector((state: any) => state.tweets);

  return (
    <Box sx={{ marginTop: "2.875rem", position: "center" }}>
      <Stack spacing={2}>
        {tweets.length > 0 ? (
          tweets.map((tweet: Tweet) => (
            <TweetContainer
              key={tweet.id}
              author_id={tweet.author_id}
              text={tweet.text}
              id={tweet.id}
            />
          ))
        ) : (
          <Stack spacing={2}>
            <Skeleton variant="rounded" width={780} height={100} />
            <Skeleton variant="rounded" width={780} height={100} />
            <Skeleton variant="rounded" width={780} height={100} />
            <Skeleton variant="rounded" width={780} height={100} />
            <Skeleton variant="rounded" width={780} height={100} />
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
