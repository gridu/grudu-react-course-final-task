import styled from '@emotion/styled';
import Avatar from 'react-avatar';
import { useSelector, useDispatch } from 'react-redux'

interface TopBarProps {
  userFullName: string
}

const TopBarWrapper = styled.div`
  background-color: #CBCCD6;
  padding: 1.5rem 5.25rem;
  position: sticky;
  top: 0px;
  width: 100%;
`;

const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    display: flex;
    align-items: center;
  }
`;

const TopBar = () => {
  const user = useSelector((state: any) => state.user);

  return (
    <TopBarWrapper>
      <TopBarContainer>
        <div>
          <div style={{marginRight: '1rem'}}>logo</div>
          <span>Another Twitter Clone</span>
        </div>
        <div>
          <span className='username'>
            {user.fullName}
          </span>
          <Avatar name={user.fullName} round size='64' style={{marginLeft: '1rem'}}/>
        </div>
      </TopBarContainer>
    </TopBarWrapper>
  )
}

export default TopBar;