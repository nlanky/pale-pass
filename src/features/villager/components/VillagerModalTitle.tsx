// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Grid, Tooltip, Typography } from "@mui/material";
import type { SxProps } from "@mui/material";
import {
  Carpenter as BuilderIcon,
  Backpack as GathererIcon,
  LocalHospital as HealerIcon,
  Hiking as ScoutIcon,
  MilitaryTech as SoldierIcon,
  PersonSearch as SpyIcon,
} from "@mui/icons-material";

// LOCAL FILES
// Interfaces & Types
import type { Villager } from "features/villager/types";

interface VillagerModalTitleProps {
  villager: Villager;
}

export const VillagerModalTitle: FC<VillagerModalTitleProps> = ({
  villager,
}) => {
  const { name, occupation, specialty } = villager;

  // Utility functions
  const getClassIcon = () => {
    const sx: SxProps = {
      p: 0.5,
      backgroundColor: "parchmentDark.main",
      color: "white",
      borderRadius: "50%",
      fontSize: "4rem",
    };

    switch (specialty) {
      case "Builder":
        return <BuilderIcon sx={sx} />;
      case "Gatherer":
        return <GathererIcon sx={sx} />;
      case "Healer":
        return <HealerIcon sx={sx} />;
      case "Scout":
        return <ScoutIcon sx={sx} />;
      case "Soldier":
        return <SoldierIcon sx={sx} />;
      case "Spy":
        return <SpyIcon sx={sx} />;
      default:
        break;
    }
  };

  return (
    <Grid
      alignItems="center"
      container
      justifyContent="space-between"
      sx={{ minWidth: 350, pt: 1, px: 2.5 }}
    >
      <Grid item>
        <Typography
          component="h2"
          variant="h6"
        >{`${name} the ${occupation}`}</Typography>
      </Grid>
      <Tooltip
        title={<Typography variant="body2">{specialty}</Typography>}
      >
        <Grid item>{getClassIcon()}</Grid>
      </Tooltip>
    </Grid>
  );
};
