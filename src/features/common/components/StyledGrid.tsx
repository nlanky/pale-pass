// PUBLIC MODULES
import { Grid, useTheme } from "@mui/material";
import type { GridProps } from "@mui/material";

export const StyledGrid = (props: GridProps) => {
  // Hooks
  const theme = useTheme();

  return (
    <Grid
      {...props}
      sx={{
        ...props.sx,
        backgroundColor: "#fffef0",
        boxShadow: "2px 3px 20px black,0 0 125px #8f5922 inset",
        padding: theme.spacing(1),
      }}
    />
  );
};
