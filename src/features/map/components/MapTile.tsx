// REACT
import type { FC, ReactNode } from "react";

// PUBLIC MODULES
import { Grid, Tooltip, Typography } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

// LOCAL FILES
// Constants
import { PLAYER_ID } from "features/player/constants";
// Hooks
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
// Interfaces & Types
import type { Tile } from "features/map/types";
// Redux
import { selectConqueredPlayerIds } from "features/combat/combatSlice";
import { exploreTile } from "features/map/actions";
import { selectTownScouts } from "features/town/townSlice";

interface MapTileProps {
  tile: Tile;
}

export const MapTile: FC<MapTileProps> = ({ tile }) => {
  const { x, y, scoutAmount, visible, explored, playerId } = tile;

  // Hooks
  const dispatch = useAppDispatch();
  const conqueredPlayerIds = useAppSelector(selectConqueredPlayerIds);
  const numberOfScouts = useAppSelector(selectTownScouts);

  // Derived variables
  const isConquered =
    playerId && conqueredPlayerIds.includes(playerId);
  // TODO: Icons
  let backgroundColor = "black";
  if (playerId === PLAYER_ID) {
    backgroundColor = "blue";
  } else if (visible) {
    if (playerId && isConquered) {
      backgroundColor = "green";
    } else if (playerId) {
      backgroundColor = "red";
    } else if (explored) {
      backgroundColor = "gray";
    } else {
      backgroundColor = "lightgray";
    }
  }
  const enabled =
    playerId === PLAYER_ID ||
    (visible &&
      ((!explored && 2 * numberOfScouts >= scoutAmount) ||
        (playerId && !isConquered)));

  // Handlers
  const onTileClick = (tile: Tile) => {
    if (!enabled) {
      return;
    }

    dispatch(exploreTile(tile));
  };

  // Utility functions
  const getTooltipTitle = (): ReactNode => {
    if (playerId === PLAYER_ID) {
      return <Typography variant="body2">Go to your town</Typography>;
    }

    if (visible) {
      if (playerId && !isConquered) {
        return (
          <Typography variant="body2">Attack enemy town</Typography>
        );
      }

      if (scoutAmount > numberOfScouts * 2) {
        return (
          <Typography variant="body2">
            You need additional scouts
          </Typography>
        );
      }
    }

    return "";
  };

  return (
    <Tooltip title={getTooltipTitle()}>
      <Grid
        alignItems="center"
        container
        item
        justifyContent="center"
        onClick={() => {
          onTileClick(tile);
        }}
        role="button"
        sx={{
          backgroundColor,
          position: "absolute",
          width: 96,
          height: 96,
          top: y * 96,
          left: x * 96,
          cursor: enabled ? "pointer" : "default",
        }}
      >
        {visible && playerId && (
          <Typography color="white" variant="h4">
            {playerId}
          </Typography>
        )}

        {visible && !explored && !playerId && (
          <>
            <SearchIcon />
            <Typography variant="body2">{scoutAmount}</Typography>
          </>
        )}
      </Grid>
    </Tooltip>
  );
};
