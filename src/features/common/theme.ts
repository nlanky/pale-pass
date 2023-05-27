// PUBLIC MODULES
import { createTheme } from "@mui/material";
import type {
  PaletteColor,
  PaletteColorOptions,
} from "@mui/material";

const defaultTheme = createTheme();
const createColour = (mainColour: string) =>
  defaultTheme.palette.augmentColor({ color: { main: mainColour } });

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
  interface Palette {
    parchment: PaletteColor;
    parchmentDark: PaletteColor;
  }
  interface PaletteOptions {
    parchment: PaletteColorOptions;
    parchmentDark: PaletteColorOptions;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    parchment: true;
    parchmentDark: true;
  }
}

declare module "@mui/material/Slider" {
  interface SliderPropsColorOverrides {
    parchment: true;
    parchmentDark: true;
  }
}

declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    parchment: true;
    parchmentDark: true;
  }
}
