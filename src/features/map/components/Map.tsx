// REACT
import type { FC } from "react";

// PUBLIC MODULES
import {
  Container,
  Grid,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

// LOCAL FILES
// Components
import { ReturnToTownButton } from "features/common/components";
import { TownResources } from "features/town/components";
// Constants
import { PLAYER_ID } from "features/player/constants";
// Hooks
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
// Interfaces & Types
import type { MapTile } from "features/map/types";
// Redux
import { selectConqueredPlayerIds } from "features/combat/combatSlice";
import { exploreTile, selectMapTiles } from "features/map/mapSlice";

export const Map: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const mapTiles = useAppSelector(selectMapTiles);
  const conqueredPlayerIds = useAppSelector(selectConqueredPlayerIds);

  // Handlers
  const onTileClick = (tile: MapTile) => {
    if (tile.playerId && conqueredPlayerIds.includes(tile.playerId)) {
      return;
    }

    // Can only explore tiles player can see
    if (!tile.visible) {
      return;
    }

    // TODO: Check scout amount
    dispatch(exploreTile(tile));
  };

  // Utility functions
  const getTooltipTitle = (tile: MapTile): string => {
    if (tile.playerId === PLAYER_ID) {
      return "Go to your town";
    }

    if (
      tile.visible &&
      tile.playerId &&
      !conqueredPlayerIds.includes(tile.playerId)
    ) {
      // TODO: Add known military strength
      return "Attack enemy town";
    }

    return "";
  };

  return (
    <Container maxWidth="lg">
      <Grid
        container
        item
        spacing={1}
        sx={{ marginTop: theme.spacing(1) }}
        wrap="nowrap"
      >
        <Grid
          container
          sx={{
            position: "relative",
            width: 960,
            marginTop: theme.spacing(1),
          }}
        >
          {mapTiles.map((tile) => {
            const { x, y, spyAmount, visible, explored, playerId } =
              tile;

            // TODO: Icons
            let backgroundColor = "black";
            if (playerId === PLAYER_ID) {
              backgroundColor = "blue";
            } else if (visible) {
              if (playerId && conqueredPlayerIds.includes(playerId)) {
                backgroundColor = "green";
              } else if (playerId) {
                backgroundColor = "red";
              } else if (explored) {
                backgroundColor = "gray";
              } else {
                backgroundColor = "lightgray";
              }
            }

            return (
              <Tooltip
                key={`tile_${x}_${y}`}
                title={getTooltipTitle(tile)}
              >
                <Grid
                  alignItems="center"
                  container
                  item
                  justifyContent="center"
                  onClick={() => {
                    onTileClick(tile);
                  }}
                  sx={{
                    backgroundColor,
                    position: "absolute",
                    width: 96,
                    height: 96,
                    top: y * 96,
                    left: x * 96,
                    cursor:
                      playerId === PLAYER_ID ||
                      (visible &&
                        (!explored ||
                          (playerId &&
                            !conqueredPlayerIds.includes(playerId))))
                        ? "pointer"
                        : "default",
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
                      <Typography variant="body2">
                        {spyAmount}
                      </Typography>
                    </>
                  )}
                </Grid>
              </Tooltip>
            );
          })}
        </Grid>
        <Grid container direction="column" item spacing={1} xs>
          <Grid item>
            <ReturnToTownButton />
          </Grid>
          <Grid item>
            <TownResources showRpt={false} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
