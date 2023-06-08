// PUBLIC MODULES
import { Container } from "@mui/material";
import type { ContainerProps } from "@mui/material";

export const StyledContainer = (props: ContainerProps) => (
  <Container
    {...props}
    maxWidth={props.maxWidth || "lg"}
    sx={{
      ...props.sx,
      backgroundColor: "parchment.main",
      boxShadow: "2px 3px 20px black, 0 0 125px #8f5922 inset",
      p: 2,
    }}
  />
);
