import axios from "axios";
import { useDispatch } from "react-redux";
import { tweetsUrl } from "../Constants";
import { setTweets } from "../redux/Tweets";

export default function GetTweets(userId: string = "") {
  const dispatch = useDispatch();
  const searchString = userId ? "?id=" + userId : "";

  axios
    .get(tweetsUrl + searchString)
    .then((response) => {
      dispatch(setTweets(response.data ?? []));
    })
    .catch((error) => {
      console.log(error);
    });
}
