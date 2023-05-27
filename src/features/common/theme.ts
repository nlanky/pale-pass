// PUBLIC MODULES
import { createTheme } from "@mui/material";
import type { SimplePaletteColorOptions } from "@mui/material";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColour = (mainColour: string) =>
  augmentColor({ color: { main: mainColour } });

export const theme = createTheme({
  typography: {
    fontFamily: "Cormorant Garamond, Times New Roman, sans-serif",
    htmlFontSize: 10,
    // TODO: Tailor font sizes once design is mature
    // h1: {
    //   fontSize: "4rem",
    // },
    // h2: {
    //   fontSize: "3.2rem",
    // },
    // h3: {
    //   fontSize: "2.8rem",
    // },
    // h4: {
    //   fontSize: "2.4rem",
    // },
    // h5: {
    //   fontSize: "2rem",
    // },
    // h6: {
    //   fontSize: "1.6rem",
    // },
    // subtitle1: {
    //   fontSize: "1.6rem",
    // },
    // subtitle2: {
    //   fontSize: "1.6rem",
    // },
    body1: {
      fontSize: "1.6rem",
    },
    body2: {
      fontSize: "1.8rem",
    },
    button: {
      fontSize: "1.8rem",
    },
    // caption: {
    //   fontSize: "1.6rem",
    // },
    // overline: {
    //   fontSize: "1.6rem",
    // },
  },
  palette: {
    parchment: createColour("#fffef0"),
    parchmentDark: createColour("#af895e"),
  },
});

declare module "@mui/material/styles" {
  interface CustomPalette {
    parchment: SimplePaletteColorOptions;
    parchmentDark: SimplePaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    parchmentDark: true;
  }
}
