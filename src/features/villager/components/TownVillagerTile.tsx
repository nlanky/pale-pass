// REACT
import type { FC, ReactNode } from "react";

// PUBLIC MODULES
import { Grid, Tooltip, Typography } from "@mui/material";

// LOCAL FILES
// Components
import { VillagerAvatar } from "features/villager/components";
// Constants
import { ID_TO_VILLAGER } from "features/villager/constants";
//  Hooks
import { useAppSelector } from "features/redux/hooks";
// Redux
import { selectTownVillager } from "features/town/selectors";

interface TownVillagerTileProps {
  villagerId: number;
  hoveringOnVillager: boolean;
  onVillagerClick: (id: number) => void;
  onVillagerMouseEnter: (id: number) => void;
  onVillagerMouseLeave: () => void;
}

export const TownVillagerTile: FC<TownVillagerTileProps> = ({
  villagerId,
  hoveringOnVillager,
  onVillagerClick,
  onVillagerMouseEnter,
  onVillagerMouseLeave,
}) => {
  // Hooks
  const townVillager = useAppSelector(selectTownVillager(villagerId));

  // Derived variables
  const { id, name } = ID_TO_VILLAGER[villagerId];
  const state = townVillager?.state;

  const getTooltipTitle = (): ReactNode => {
    if (state === "recovering") {
      return (
        <Typography variant="body2">{`Recovering, ${townVillager?.recoveryTimeRemaining} days remaining`}</Typography>
      );
    }

    return "";
  };

  return (
    <Tooltip title={getTooltipTitle()}>
      <Grid
        alignItems="center"
        container
        direction="column"
        item
        justifyContent="center"
        onClick={() => {
          onVillagerClick(id);
        }}
        onMouseEnter={() => {
          onVillagerMouseEnter(id);
        }}
        onMouseLeave={() => {
          onVillagerMouseLeave();
        }}
        sx={{
          backgroundColor: hoveringOnVillager
            ? "action.hover"
            : "transparent",
          cursor: "pointer",
          p: 1,
          position: "relative",
          width: "auto",
        }}
      >
        <VillagerAvatar villagerId={villagerId} hideStateText />
        <Typography sx={{ mt: 1 }} variant="body2">
          {name}
        </Typography>
      </Grid>
    </Tooltip>
  );
};
