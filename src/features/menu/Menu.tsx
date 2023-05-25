// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Button, Container, Grid, Typography } from "@mui/material";

// LOCAL FILES
// Redux
import { useAppDispatch } from "features/redux/hooks";
import { setView } from "features/game/gameSlice";

export const Menu: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();

  // Handlers
  const onGameStart = () => {
    dispatch(setView("introduction"));
  };

  return (
    <Container maxWidth="lg">
      <Typography align="center" variant="h1">
        Pale Pass
      </Typography>
      <Grid justifyContent="center" container>
        <Button onClick={onGameStart} variant="contained">
          Start Game
        </Button>
      </Grid>
    </Container>
  );
};
