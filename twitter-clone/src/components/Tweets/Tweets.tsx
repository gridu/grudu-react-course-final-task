import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { refresh, tweetsList, userAuth } from "../../recoil/atom";
import { getInitials } from "../../utils/functions";
import SingleTweet from "./SingleTweet/SingleTweet";
import TweetForm from "./TweetForm/TweetForm";
import './Tweets.css';

const Tweets: React.FC = () => {
    const [tweets, setTweets] = useRecoilState(tweetsList);
    const [shouldRefresh, setShouldRefresh] = useRecoilState(refresh);
    const { user } = useRecoilValue(userAuth);
    const [initials, setInitials] = useState(''); // TODO:
    const [isError, setIsError] = useState(false);

    const getAllTweets = async () => { // TODO: could be wrapped in useCallback
        try {
            const result = await axios.get('http://localhost:3001/tweets');
            setTweets(result.data);
        }
        catch (err) {
            setIsError(true)
        }
    }
    
    useEffect(() => {
        const letters = getInitials(user.name)
        setInitials(letters)
        getAllTweets();
    }, []);

    useEffect(() => {
        if (shouldRefresh) {
            getAllTweets();
            setShouldRefresh(false);
        }
    }, [shouldRefresh]);

    if (isError) {
        return <Navigate to='/error' />
    }

    return (
        <div className="tweets-page">
            <header>
                <div className="header-content">
                    <div>Another Twitter Clone</div>
                    <div className="space" />
                    <span className="header-user">{user.name}<div className="circle-initial">{initials}</div></span>
                </div>
            </header>
            <TweetForm />
            <div className="tweets-container">
                {Array.isArray(tweets) && tweets.map((tweet) => (
                    <SingleTweet key={tweet.id} tweet={tweet} />
                ))}

            </div>
        </div>
    );
}
export default Tweets;
