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

const iconSx: SxProps = {
  p: 0.5,
  backgroundColor: "parchmentDark.main",
  color: "white",
  borderRadius: "50%",
  fontSize: "4rem",
};

interface VillagerModalTitleProps {
  villager: Villager;
}

export const VillagerModalTitle: FC<VillagerModalTitleProps> = ({
  villager,
}) => {
  const { name, occupation, specialty } = villager;

  // Utility functions
  const getClassIcon = () => {
    switch (specialty) {
      case "Builder":
        return <BuilderIcon sx={iconSx} />;
      case "Gatherer":
        return <GathererIcon sx={iconSx} />;
      case "Healer":
        return <HealerIcon sx={iconSx} />;
      case "Scout":
        return <ScoutIcon sx={iconSx} />;
      case "Soldier":
        return <SoldierIcon sx={iconSx} />;
      case "Spy":
        return <SpyIcon sx={iconSx} />;
      default:
        break;
    }
  };

  return (
    <Grid
      alignItems="center"
      container
      sx={{ minWidth: 350, pt: 1, px: 2.5 }}
    >
      <Tooltip
        title={<Typography variant="body2">{specialty}</Typography>}
      >
        <span>{getClassIcon()}</span>
      </Tooltip>
      <Typography
        component="h2"
        sx={{ ml: 1 }}
        variant="h6"
      >{`${name} the ${occupation}`}</Typography>
    </Grid>
  );
};
