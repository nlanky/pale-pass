// REACT
import { forwardRef } from "react";

// PUBLIC MODULES
import { Card, Typography } from "@mui/material";
import { SnackbarContent } from "notistack";
import type { CustomContentProps } from "notistack";

export const TownNotification = forwardRef<
  HTMLDivElement,
  CustomContentProps
>(({ message }, ref) => (
  <SnackbarContent ref={ref}>
    <Card sx={{ bgcolor: "success.main", p: 2, width: "100%" }}>
      <Typography color="white" variant="body2">
        {message}
      </Typography>
    </Card>
  </SnackbarContent>
));
