// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Container, Grid } from "@mui/material";

// LOCAL FILES
// Components
import { ReturnToTownButton } from "features/common/components";
import { MapTile } from "features/map/components";
import { TownResources } from "features/town/components";
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
            width: 960,
            mt: 1,
          }}
        >
          {mapTiles.map((tile) => (
            <MapTile key={`tile_${tile.x}_${tile.y}`} tile={tile} />
          ))}
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
