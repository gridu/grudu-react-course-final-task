import { useEffect, useState } from 'react';
import { Tweet } from '../../../types/tweet';
import { User } from '../../../types/user';
import { getUser } from '../../../utils/functions';
import './SingleTweet.css';

interface SingleTweetProps {
    tweet: Tweet;
};

const SingleTweet: React.FC<SingleTweetProps> = ({ tweet }) => {
    const [userInfo, setUserInfo] = useState({}); // TODO: should use useRecoilState here?

    useEffect(() => {
        getUser(tweet.author_id).then(res => { // TODO: inappropiate use of promise chaining. We don't have a promise here
            setUserInfo(res)
        }).catch(error => {
            console.log(error);
        });
    }, [tweet])

    return (
        <div className="tweet-container">
            <div className='user-icon'><div className="circle">{(userInfo as User)?.name?.split(" ").map((n) => n[0]).join("")}</div></div>
            <div className="content-container">
                <h2>{tweet.author_id}</h2>
                <p dangerouslySetInnerHTML={{ __html: tweet.text }} ></p>
            </div>
        </div>
    );
}
export default SingleTweet;