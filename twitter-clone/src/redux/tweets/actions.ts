import axios from 'axios';
import { useDispatch } from 'react-redux';

import { TWEETS_API } from '../../constants/urls';
import { getTweets } from './reducers';

export const FetchTweets = () => {
  const dispatch = useDispatch();

  axios.get(TWEETS_API)
    .then((res) => {
      console.log(res.status, res.statusText);
      dispatch(getTweets(res.data?.reverse() ?? []));
    })
    .catch((e) => {
      console.error(e);
    });
};
