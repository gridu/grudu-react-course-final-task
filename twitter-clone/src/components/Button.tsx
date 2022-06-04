import styled from '@emotion/styled';

interface ButtonProps {
  align: "flex-end" | "flex-start" | "center" | "auto";
}

const Button = styled.button`
  background: #CBCCD6;
  border: 2px solid #42434B;
  border-radius: 8px;
  padding: 0.5rem 1.875rem;
  margin-top: 1.25rem;
  font-size: 1.75rem;
  cursor: pointer;
  align-self: ${(props: ButtonProps) => props.align}
`;

export default Button;