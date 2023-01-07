import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { tweetsUrl } from "../../../Constants";
import DOMPurify from "isomorphic-dompurify";
import { setTweets } from "../../../redux/Tweets";
import { User } from "../../../redux/User";
import { Box, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function TweetInput() {
  const user: User = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const TweetSchema = Yup.object().shape({
    tweet: Yup.string()
      .max(140, "Keep this tweet 140 characters maximum.")
      .required("Write at least 1 character."),
  });

  const formik = useFormik({
    initialValues: { tweet: "" },
    validationSchema: TweetSchema,
    onSubmit: (values, actions) => {
      actions.setSubmitting(true);
      axios
        .post(tweetsUrl, {
          author_id: user.id,
          text: DOMPurify.sanitize(values.tweet),
        })
        .then((response) => {
          if (response.status === 201 && response.data) {
            axios
              .get(tweetsUrl)
              .then((response) => {
                dispatch(setTweets(response.data ?? []));
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          actions.setSubmitting(false);
          actions.resetForm();
        });
    },
  });

  return (
    <Box
      sx={{
        boxSizing: "border-box",
        marginTop: "10px",
        position: "center",
        width: "780px",
        height: "auto",
      }}
    >
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Stack spacing={1}>
          <TextField
            fullWidth
            multiline
            id="tweet"
            name="tweet"
            type="text"
            margin="dense"
            placeholder={
              user.loggedIn
                ? "What’s happening?"
                : "Log in or sign up to share your thoughts"
            }
            rows={5}
            value={formik.values.tweet}
            onChange={formik.handleChange}
            error={formik.touched.tweet && Boolean(formik.errors.tweet)}
            helperText={formik.touched.tweet && formik.errors.tweet}
            disabled={!user.loggedIn}
          />
          <Button
            type="submit"
            disabled={formik.isSubmitting || !user.loggedIn}
            variant="contained"
            color="primary"
          >
            Tweet
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
