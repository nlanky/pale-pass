// PUBLIC MODULES
import { Paper, useTheme } from "@mui/material";
import type { PaperProps } from "@mui/material";

export const StyledPaper = (props: PaperProps) => {
  // Hooks
  const theme = useTheme();

  return (
    <Paper
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
