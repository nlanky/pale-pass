// REACT
import type { FC, ReactNode } from "react";

// PUBLIC MODULES
import { Grid, Tooltip, Typography } from "@mui/material";

// LOCAL FILES
// Constants
import { MAP_TILE_WIDTH } from "features/map/constants";
import { PLAYER_ID } from "features/player/constants";
// Hooks
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
// Interfaces & Types
import type { Tile } from "features/map/types";
// Redux
import { selectConqueredPlayerIds } from "features/combat/selectors";
import { exploreTile } from "features/map/actions";
import { selectTownScouts } from "features/town/selectors";

interface MapTileProps {
  tile: Tile;
}

export const MapTile: FC<MapTileProps> = ({ tile }) => {
  const { x, y, image, scoutAmount, visible, explored, playerId } =
    tile;

  // Hooks
  const dispatch = useAppDispatch();
  const conqueredPlayerIds = useAppSelector(selectConqueredPlayerIds);
  const numberOfScouts = useAppSelector(selectTownScouts);

  // Derived variables
  const isConquered =
    playerId && conqueredPlayerIds.includes(playerId);
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
          position: "absolute",
          width: MAP_TILE_WIDTH,
          height: MAP_TILE_WIDTH,
          top: (y - 1) * MAP_TILE_WIDTH,
          left: (x - 1) * MAP_TILE_WIDTH,
          cursor: enabled ? "pointer" : "default",
        }}
      >
        {visible && <img src={image} />}
        {visible && !explored && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            }}
          />
        )}
      </Grid>
    </Tooltip>
  );
};
