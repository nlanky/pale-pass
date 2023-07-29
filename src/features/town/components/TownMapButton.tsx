// REACT
import type { FC } from "react";

// PUBLIC MODULES
// import { Tooltip, Typography } from "@mui/material";
import { Map as MapIcon } from "@mui/icons-material";

// LOCAL FILES
// Components
import { StyledButton } from "features/common/components";
// Hooks
import {
  useAppDispatch /*,useAppSelector*/,
} from "features/redux/hooks";
// Redux
import { setView } from "features/game/actions";
// import { selectTownHasCartographer } from "features/town/townSlice";

export const TownMapButton: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  // TODO: Add check back when map testing complete
  // const hasCartographer = useAppSelector(selectTownHasCartographer);

  // Handlers
  const onMapClick = () => {
    dispatch(setView("map"));
  };

  return (
    // <Tooltip
    //   title={
    //     <Typography variant="body2">
    //       {true ? "" : "You must build a Cartographer"}
    //     </Typography>
    //   }
    // >
    //   <span>
    <StyledButton
      // disabled={!hasCartographer}
      fullWidth
      onClick={onMapClick}
      startIcon={<MapIcon />}
      variant="contained"
    >
      Map
    </StyledButton>
    //   </span>
    // </Tooltip>
  );
};
