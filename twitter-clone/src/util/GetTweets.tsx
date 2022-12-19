import axios from "axios";
import { useDispatch } from "react-redux";
import { tweetsUrl } from "../Constants";
import { setTweets } from "../redux/Tweets";

export default function getTweets(userId: string = "") {
  const dispatch = useDispatch();
  const searchString = userId ? "?id=" + userId : "";

  axios
    .get(tweetsUrl + searchString)
    .then((response) => {
      response.data ? dispatch(setTweets(response.data)) : null;
    })
    .catch((error) => {
      console.log(error);
    });
}
