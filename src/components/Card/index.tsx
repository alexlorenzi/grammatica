import styled from "styled-components";

const Card = styled.div`
  position: relative;

  background-color: ${({ theme }) => theme.palette.primary};

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 75%;
  height: 35rem;
  max-width: 40rem;

  @media only screen and (max-width: 600px) {
    height: 25rem;
  }

  box-sizing: border-box;
  border: ${({ theme }) => theme.shape.border};
  box-shadow: ${({ theme }) => theme.shape.shadow};

  margin: 2rem auto;
  padding: 3rem;
`;

export default Card;
