import styled from '@emotion/styled';

interface FeedbackProps {
  show: boolean
}

const Feedback = styled.div`
  margin-top: 1rem;
  display: ${(props: FeedbackProps) => props.show ? 'block' : 'none'}
`;

export default Feedback;