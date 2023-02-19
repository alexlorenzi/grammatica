import React from "react";
import styled from "styled-components";

const Header = styled.header`
  margin: 0 auto;
`;
const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.palette.info};
  font-size: 3rem;
  font-weight: normal;
`;

type HeaderProps = {};
const Masthead = (props: HeaderProps) => (
  <Header>
    <Title>Grammatica</Title>
  </Header>
);

export default Masthead;
