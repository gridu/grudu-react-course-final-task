import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { tweetsUrl } from "../../../Constants";
import DOMPurify from "isomorphic-dompurify";
import { setTweets } from "../../../redux/Tweets";
import { User } from "../../../redux/User";

export default function TweetInput() {
  const user: User = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const TweetSchema = Yup.object().shape({
    tweet: Yup.string()
      .min(1, "Write at least 1 character.")
      .max(140, "Keep this tweet 140 characters maximum."),
  });

  return (
    <div>
      <Formik
        initialValues={{ tweet: "" }}
        validationSchema={TweetSchema}
        onSubmit={(values, actions) => {
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
        }}
      >
        {({ isSubmitting }) => (
          <Form style={{ display: "flex", flexDirection: "column" }}>
            <Field
              type="text"
              name="tweet"
              placeholder="What’s happening?"
              component="textarea"
              rows={5}
            />
            <ErrorMessage name="tweet" component="div" />

            <button type="submit" disabled={isSubmitting || !user.loggedIn}>
              {user.loggedIn
                ? "Tweet"
                : "Log in or sign up to share your thoughts"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
