import React from "react";
import styled, {
  createGlobalStyle,
  DefaultTheme,
  ThemeProvider,
} from "styled-components";
import Masthead from "./components/Header";

import { VerbGame } from "./games/verbs";

const theme: DefaultTheme = {
  typography: {
    family: `'Share Tech Mono', monospace`,
  },
  shape: {
    border: "3px solid #020200",
    shadow: "10px 10px 0 0 #020200",
  },
  palette: {
    background: "#414ec3",
    primary: "#2dcbc4",
    secondary: "#f474a6",
    info: "#f6dc4f",
    text: "#020200",
  },
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-size: 2rem;
    font-family: ${(props) => props.theme.typography.family};
    background-color: ${(props) => props.theme.palette.background} ;
    @media only screen and (max-width: 600px) {
      font-size: 1.5rem;
    }
  }
`;

const Layout = styled.div`
  display: grid;
  align-items: center;
  grid-template-rows: 5rem auto;
  grid-template-columns: 100%;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <GlobalStyle />
        <Masthead />
        <main>
          <VerbGame />
        </main>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
