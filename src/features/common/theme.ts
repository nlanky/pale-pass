// PUBLIC MODULES
import { createTheme } from "@mui/material";
import type {
  PaletteColor,
  PaletteColorOptions,
} from "@mui/material";

// LOCAL FILES
// Constants
import { TABLE_ROW_HEIGHT } from "features/common/constants";

declare module "@mui/material/styles" {
  interface ExtendedTheme {
    gap: (spacing: number) => number;
  }
  interface Theme extends ExtendedTheme {}
  interface ThemeOptions extends ExtendedTheme {}
}

const defaultTheme = createTheme();
const createColour = (mainColour: string) =>
  defaultTheme.palette.augmentColor({ color: { main: mainColour } });
const gap = (spacing: number) =>
  parseInt(defaultTheme.spacing(spacing), 10);

export const theme = createTheme({
  components: {
    MuiTableRow: {
      styleOverrides: {
        root: {
          height: TABLE_ROW_HEIGHT,
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        enterNextDelay: 250,
      },
    },
  },
  palette: {
    error: createColour("#8f252e"),
    success: createColour("#0d421c"),
    frame: createColour("#a14d2b"),
  },
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
  // Utility function for spacing maths
  gap,
});

declare module "@mui/material/styles" {
  interface Palette {
    frame: PaletteColor;
  }
  interface PaletteOptions {
    frame: PaletteColorOptions;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    frame: true;
  }
}

declare module "@mui/material/Slider" {
  interface SliderPropsColorOverrides {
    frame: true;
  }
}

declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    frame: true;
  }
}

declare module "@mui/material/TextField" {
  interface TextFieldPropsColorOverrides {
    frame: true;
  }
}

declare module "@mui/material/Checkbox" {
  interface CheckboxPropsColorOverrides {
    frame: true;
  }
}
