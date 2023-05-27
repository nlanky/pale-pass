// PUBLIC MODULES
import { Container, useTheme } from "@mui/material";
import type { ContainerProps } from "@mui/material";

export const StyledContainer = (props: ContainerProps) => {
  // Hooks
  const theme = useTheme();

  return (
    <Container
      {...props}
      maxWidth={props.maxWidth || "lg"}
      sx={{
        ...props.sx,
        backgroundColor: theme.palette.parchment.main,
        boxShadow: "2px 3px 20px black,0 0 125px #8f5922 inset",
        padding: theme.spacing(2),
      }}
    />
  );
};
