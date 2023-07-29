// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Grid, Tooltip, Typography } from "@mui/material";

// LOCAL FILES
// Components
import {
  StyledButton,
  StyledContainer,
} from "features/common/components";
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
    <StyledContainer sx={{ p: 2 }}>
      <Grid alignItems="center" container direction="column">
        <Typography align="center" sx={{ mb: 1 }} variant="h1">
          Pale Pass
        </Typography>
        <Grid item>
          <StyledButton onClick={onGameStart}>New Game</StyledButton>
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
                sx={{ ml: 2 }}
              >
                Load Game
              </StyledButton>
            </span>
          </Tooltip>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};
