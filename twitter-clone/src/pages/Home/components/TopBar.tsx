import styled from '@emotion/styled';

interface TopBarProps {
  name: string
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
`;

const TopBar = () => {
  return (
    <TopBarWrapper>
      <TopBarContainer>
        Topbar content
      </TopBarContainer>
    </TopBarWrapper>
  )
}

export default TopBar;