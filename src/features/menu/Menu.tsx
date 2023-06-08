// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Grid, Typography } from "@mui/material";

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

  // Handlers
  const onGameStart = () => {
    dispatch(setView("introduction"));
  };

  return (
    <StyledContainer sx={{ p: 2 }}>
      <Grid alignItems="center" container direction="column">
        <Typography align="center" sx={{ mb: 1 }} variant="h1">
          Pale Pass
        </Typography>
        <StyledButton onClick={onGameStart}>Start Game</StyledButton>
      </Grid>
    </StyledContainer>
  );
};
