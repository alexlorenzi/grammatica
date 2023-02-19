import "styled-components";
declare module "styled-components" {
  export interface DefaultTheme {
    typography: {
      family: string;
    };
    shape: {
      border: string;
      shadow: string;
    };
    palette: {
      background: string;
      primary: string;
      secondary: string;
      info: string;
      text: string;
    };
  }
}
