import React from "react";
import { Tweet } from "../../../redux/Tweets";
import Avatar from "react-avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

export default function TweetContainer({ author_id, text }: Tweet) {
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        padding: "10px",
        position: "center",
        width: "780px",
        height: "auto",
        background: "#FFFFFF",
        border: "1px solid #42434B",
        borderRadius: "8px",
        boxShadow: 1,
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={8}
      >
        <Grid item xs={1}>
          <Avatar
            name={author_id}
            round
            size="58"
            style={{ marginRight: "1.25rem" }}
          />
        </Grid>
        <Grid item xs>
          <Stack spacing={1}>
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <strong>{author_id}</strong>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: text }} />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
