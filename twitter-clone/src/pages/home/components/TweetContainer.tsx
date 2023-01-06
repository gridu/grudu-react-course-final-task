import React from "react";
import { Tweet } from "../../../redux/Tweets";
import Avatar from "react-avatar";
import parse from "html-react-parser";

export default function TweetContainer({ author_id, text }: Tweet) {
  return (
    <div>
      <Avatar
        name={author_id}
        round
        size="58"
        style={{ marginRight: "1.25rem" }}
      />

      <div className="tweet__text">
        <div className="tweet__user">{author_id}</div>
        <div className="tweet__text">{parse(text)}</div>
      </div>
    </div>
  );
}
