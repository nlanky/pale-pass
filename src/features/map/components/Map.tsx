// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Container, Grid, useTheme } from "@mui/material";

// LOCAL FILES
// Components
import { StyledButton } from "features/common/components";
// Hooks
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
// Redux
import { setView } from "features/game/gameSlice";
import { selectMapTiles } from "features/map/mapSlice";

export const Map: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const mapTiles = useAppSelector(selectMapTiles);

  // Handlers
  const onReturnToTown = () => {
    dispatch(setView("town"));
  };

  return (
    <Container maxWidth="lg">
      <StyledButton onClick={onReturnToTown}>
        Return to Town
      </StyledButton>
      <Grid
        container
        sx={{ position: "relative", marginTop: theme.spacing(1) }}
      >
        {mapTiles.map((tile) => {
          const { x, y } = tile;

          return (
            <Grid
              key={`tile_${x}_${y}`}
              sx={{
                backgroundColor: `rgba(0, 0, 0, ${Math.random().toFixed(
                  2,
                )})`,
                position: "absolute",
                width: 96,
                height: 96,
                top: y * 96,
                left: x * 96,
              }}
            />
          );
        })}
      </Grid>
    </Container>
  );
};
