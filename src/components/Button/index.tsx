import styled from "styled-components";
import { desaturate } from "polished";

const Button = styled.input.attrs((props: { type?: "button" | "submit" }) => ({
  type: props.type || "submit",
}))`
  font-family: ${({ theme }) => theme.typography.family};
  font-size: 2rem;
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.palette.secondary};
  border: ${({ theme }) => theme.shape.border};
  box-shadow: ${({ theme }) => theme.shape.shadow};
  cursor: pointer;
  outline: none;
  :focus {
    outline: ${({ theme }) => `5px solid ${theme.palette.info}`};
  }
  :disabled {
    background-color: ${({ theme }) =>
      desaturate(0.4, theme.palette.secondary)};
  }
  :active {
    transform: translate(8px, 8px);
    box-shadow: ${({ theme }) => `0 0 0 0 ${theme.palette.text}`};
  }
  @media only screen and (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

export default Button;
