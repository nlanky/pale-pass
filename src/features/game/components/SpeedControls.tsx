// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Grid, IconButton, Typography } from "@mui/material";
import {
  FastForward as FastForwardIcon,
  FastRewind as FastRewindIcon,
  Pause as PauseIcon,
  PlayArrow as PlayArrowIcon,
} from "@mui/icons-material";

// LOCAL FILES
// Constants
import {
  MAX_GAME_SPEED,
  MIN_GAME_SPEED,
} from "features/game/constants";
// Hooks
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
// Redux
import {
  decreaseGameSpeed,
  increaseGameSpeed,
  selectGamePaused,
  selectGameSpeed,
  togglePause,
} from "features/game/gameSlice";

export const SpeedControls: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const gamePaused = useAppSelector(selectGamePaused);
  const gameSpeed = useAppSelector(selectGameSpeed);

  // Handlers
  const onGameSpeedDecrease = () => {
    dispatch(decreaseGameSpeed());
  };

  const onGamePauseToggle = () => {
    dispatch(togglePause());
  };

  const onGameSpeedIncrease = () => {
    dispatch(increaseGameSpeed());
  };

  return (
    <Grid
      alignItems="center"
      container
      justifyContent="space-around"
      wrap="nowrap"
    >
      <Grid alignItems="center" container direction="column">
        <Typography sx={{ fontWeight: "bold" }} variant="body2">
          Speed
        </Typography>
        <Typography variant="body2">{gameSpeed}x</Typography>
      </Grid>
      <IconButton
        disabled={gameSpeed === MIN_GAME_SPEED}
        onClick={onGameSpeedDecrease}
        sx={{
          backgroundColor: "parchmentDark.main",
          color: "white",
          "&:hover": {
            backgroundColor: "parchmentDark.light",
          },
          "&:disabled": {
            backgroundColor: "lightgray",
          },
        }}
      >
        <FastRewindIcon />
      </IconButton>
      <IconButton
        onClick={onGamePauseToggle}
        sx={{
          backgroundColor: "parchmentDark.main",
          color: "white",
          ml: 0.25,
          "&:hover": {
            backgroundColor: "parchmentDark.light",
          },
          "&:disabled": {
            backgroundColor: "lightgray",
          },
        }}
      >
        {gamePaused ? <PlayArrowIcon /> : <PauseIcon />}
      </IconButton>
      <IconButton
        disabled={gameSpeed === MAX_GAME_SPEED}
        onClick={onGameSpeedIncrease}
        sx={{
          backgroundColor: "parchmentDark.main",
          color: "white",
          ml: 0.25,
          "&:hover": {
            backgroundColor: "parchmentDark.light",
          },
          "&:disabled": {
            backgroundColor: "lightgray",
          },
        }}
      >
        <FastForwardIcon />
      </IconButton>
    </Grid>
  );
};
