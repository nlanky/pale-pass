// PUBLIC MODULES
import { Paper } from "@mui/material";
import type { PaperProps } from "@mui/material";

export const StyledPaper = (props: PaperProps) => (
  <Paper
    {...props}
    sx={{
      ...props.sx,
      backgroundColor: "#fffef0",
      boxShadow: "2px 3px 20px black,0 0 125px #8f5922 inset",
      p: 1,
    }}
  />
);
