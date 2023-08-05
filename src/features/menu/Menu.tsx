// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Container, Grid, Tooltip, Typography } from "@mui/material";

// LOCAL FILES
// Assets
import { titleImage } from "assets/menu";
// Components
import { StyledButton } from "features/common/components";
// Hooks
import { useAppDispatch } from "features/redux/hooks";
// Redux
import { setView } from "features/game/actions";
import { persistor } from "features/redux/store";
// Utility functions
import {
  getGameDetailsFromLocalStorage,
  hasSavedGame,
} from "features/game/utils";

export const Menu: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();

  // Handlers
  const onGameStart = async () => {
    // Deletes persisted Redux store from local storage
    await persistor.purge();
    persistor.persist();
    dispatch(setView("introduction"));
  };

  const onGameLoad = () => {
    // Rehydrates Redux store from local storage
    persistor.persist();
  };

  // Derived variables
  const savedGame = hasSavedGame();
  const savedGameDetails = getGameDetailsFromLocalStorage();

  return (
    <Container maxWidth="lg">
      <img src={titleImage} style={{ width: "100%" }} />
      <Grid container justifyContent="space-around" sx={{ pt: 1 }}>
        <StyledButton onClick={onGameStart} width={120}>
          New Game
        </StyledButton>
        <Tooltip
          title={
            savedGame && (
              <Typography variant="body2">{`${savedGameDetails.name}, Day ${savedGameDetails.day}`}</Typography>
            )
          }
        >
          <span>
            <StyledButton
              disabled={!savedGame}
              onClick={onGameLoad}
              width={130}
            >
              Load Game
            </StyledButton>
          </span>
        </Tooltip>
      </Grid>
    </Container>
  );
};
