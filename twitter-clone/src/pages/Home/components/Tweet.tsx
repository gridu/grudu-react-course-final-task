import React from 'react';
import styled from '@emotion/styled';
import Avatar from 'react-avatar';
import parse from 'html-react-parser';

export interface TweetProps {
  id: string;
  author_id: string;
  text: string;
}

const TweetBox = styled.div`
  padding: 0.5rem 0.625rem;
  display: flex;
  margin-bottom: 1rem;
  border: 2px solid #42434B;
  border-radius: 8px;
`;

const TweetTitle = styled.span`
  font-weight: 600;
  margin-bottom: 0.375rem;
  display: block;
`;

const Tweet = ({author_id, text}: TweetProps) => (
  <TweetBox>
    <Avatar name={author_id} round size='58' style={{marginRight: '1.25rem'}}/>

    <div className='tweet__text'>
      <TweetTitle className='tweet__user'>
        {author_id}
      </TweetTitle>
      <div className='tweet__text'>
        { parse(text) }
      </div>
    </div>
  </TweetBox>
);

export default Tweet;
