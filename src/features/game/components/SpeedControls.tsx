// REACT
import type { FC } from "react";

// PUBLIC MODULES
import {
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
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
  const theme = useTheme();
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
        <Typography sx={{ fontWeight: 700 }} variant="body2">
          Speed
        </Typography>
        <Typography variant="body2">{gameSpeed}x</Typography>
      </Grid>
      <IconButton
        disabled={gameSpeed === MIN_GAME_SPEED}
        onClick={onGameSpeedDecrease}
        sx={{
          backgroundColor: theme.palette.parchmentDark.main,
          color: "white",
          "&:hover": {
            backgroundColor: theme.palette.parchmentDark.light,
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
          backgroundColor: theme.palette.parchmentDark.main,
          color: "white",
          marginLeft: theme.spacing(0.25),
          "&:hover": {
            backgroundColor: theme.palette.parchmentDark.light,
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
          backgroundColor: theme.palette.parchmentDark.main,
          color: "white",
          marginLeft: theme.spacing(0.25),
          "&:hover": {
            backgroundColor: theme.palette.parchmentDark.light,
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
