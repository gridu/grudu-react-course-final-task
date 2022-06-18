import React from "react";
import { Formik, Form, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from "react-redux";
import * as Yup from 'yup';
import axios from 'axios';

import Field from "../../../components/Input";
import Button from "../../../components/Button";

import { TWEETS_API } from "../../../constants/urls";
import { getTweets } from "../../../redux/tweets/reducers";

const TweetForm = () => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="tweet-form">
      <Formik
        initialValues={{ tweet: '' }}
        validationSchema={Yup.object({
          tweet: Yup.string()
            .min(1, 'Write at least 1 character.')
            .max(140, 'Keep this tweet 140 characters maximum.'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
  
          axios.post(TWEETS_API, {
            author_id: user.userId,
            text: values.tweet,
          })
            .then((res) => {
              console.log(res.status, res.statusText);
              axios.get(TWEETS_API)
                .then((res) => {
                  console.log(res.status, res.statusText);
                  dispatch(getTweets(res.data?.reverse() ?? []));
                })
                .catch((e) => {
                  console.error(e);
                });
            })
            .catch((e) => {
              console.error(e);
            })
            .finally(() => {
              setSubmitting(false);
            })
        }}
      >
        {({ isSubmitting }) => (
          <Form style={{display: 'flex', flexDirection: 'column'}}>
            <Field type="text" name="tweet" placeholder="What’s happening?" component="textarea" rows={5}/>
            <ErrorMessage name="tweet" component="div" />

            <Button align='flex-end' type="submit" disabled={isSubmitting}>
              Tweet
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
};

export default TweetForm;