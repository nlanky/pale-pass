// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Container, Grid } from "@mui/material";

// LOCAL FILES
// Assets
import { mapUnrevealed } from "assets/map";
// Components
import { ReturnToTownButton } from "features/common/components";
import { MapTile } from "features/map/components";
import { TownResources } from "features/town/components";
// Constants
import { MAP_TILE_WIDTH } from "features/map/constants";
// Hooks
import { useAppSelector } from "features/redux/hooks";
// Redux
import { selectMapTiles } from "features/map/mapSlice";

export const Map: FC<{}> = () => {
  // Hooks
  const mapTiles = useAppSelector(selectMapTiles);

  return (
    <Container maxWidth="lg">
      <Grid container item spacing={1} sx={{ mt: 1 }} wrap="nowrap">
        <Grid
          container
          sx={{
            position: "relative",
            mt: 1,
            width: 10 * MAP_TILE_WIDTH,
          }}
        >
          <img src={mapUnrevealed} />
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
          {mapTiles.map((tile) => (
            <MapTile key={`tile_${tile.x}_${tile.y}`} tile={tile} />
          ))}
        </Grid>
        <Grid container direction="column" item spacing={1} xs>
          <Grid item>
            <ReturnToTownButton />
          </Grid>
          <Grid item>
            <TownResources hideRpd />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
