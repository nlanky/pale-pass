// PUBLIC MODULES
import { Button } from "@mui/material";
import type { ButtonProps } from "@mui/material";

export const StyledButton = (props: ButtonProps) => (
  <Button
    {...props}
    color={props.color || "parchmentDark"}
    sx={{
      ...props.sx,
      textTransform: "none",
    }}
    variant={props.variant || "contained"}
  />
);
