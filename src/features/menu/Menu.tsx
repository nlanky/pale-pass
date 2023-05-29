// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Grid, Typography, useTheme } from "@mui/material";

// LOCAL FILES
// Components
import {
  StyledButton,
  StyledContainer,
} from "features/common/components";
// Hooks
import { useAppDispatch } from "features/redux/hooks";
// Redux
import { setView } from "features/game/gameSlice";

export const Menu: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const theme = useTheme();

  // Handlers
  const onGameStart = () => {
    dispatch(setView("introduction"));
  };

  return (
    <StyledContainer sx={{ padding: theme.spacing(2) }}>
      <Grid alignItems="center" container direction="column">
        <Typography
          align="center"
          sx={{ marginBottom: theme.spacing(1) }}
          variant="h1"
        >
          Pale Pass
        </Typography>
        <StyledButton onClick={onGameStart}>Start Game</StyledButton>
      </Grid>
    </StyledContainer>
  );
};
