// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Container, Grid, Typography, useTheme } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

// LOCAL FILES
// Components
import { ReturnToTownButton } from "features/common/components";
import { TownResources } from "features/town/components";
// Constants
import { EVENTS } from "features/event/constants";
// Hooks
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
// Interfaces & Types
import type { MapTile } from "features/map/types";
// Redux
import { triggerEvent } from "features/event/eventSlice";
import { setView } from "features/game/gameSlice";
import { exploreTile, selectMapTiles } from "features/map/mapSlice";
import { gainResources } from "features/town/townSlice";

export const Map: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const mapTiles = useAppSelector(selectMapTiles);

  // Handlers
  const onTileClick = (tile: MapTile) => {
    // Show town view if player clicks on their town on map
    if (tile.townId === 1) {
      dispatch(setView("town"));
      return;
    }

    // Explore tile and optionally trigger event
    // TODO: Spy amount check
    if (tile.visible && !tile.explored) {
      dispatch(exploreTile(tile));

      // TODO: Enemy town attacks

      if (tile.resources) {
        dispatch(gainResources(tile.resources));
      }

      if (tile.eventId) {
        const event = EVENTS.find(
          (event) => event.id === tile.eventId,
        );
        if (event) {
          dispatch(triggerEvent(event));
        }
      }
    }
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
            const { x, y, spyAmount, visible, explored, townId } =
              tile;

            // TODO: Icons
            let backgroundColor = "black";
            if (townId === 1) {
              backgroundColor = "blue";
            } else if (visible) {
              if (townId) {
                backgroundColor = "red";
              } else if (explored) {
                backgroundColor = "gray";
              } else {
                backgroundColor = "lightgray";
              }
            }

            return (
              <Grid
                key={`tile_${x}_${y}`}
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
                    townId || (visible && !explored)
                      ? "pointer"
                      : "default",
                }}
              >
                {visible && townId && (
                  <Typography color="white" variant="h4">
                    {townId}
                  </Typography>
                )}
                {visible && !explored && !townId && (
                  <>
                    <SearchIcon />
                    <Typography variant="body2">
                      {spyAmount}
                    </Typography>
                  </>
                )}
              </Grid>
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
