// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Avatar, Grid, Tooltip, Typography } from "@mui/material";
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
  const { icons, name, occupation, specialty } = villager;

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
      justifyContent="space-between"
      sx={{ minWidth: 350, pt: 1, px: 2.5 }}
    >
      <Grid alignItems="center" container item sx={{ width: "auto" }}>
        <Avatar
          alt={name}
          src={icons["healthy"]}
          sx={{ width: 48, height: 48 }}
        />
        <Typography
          component="h2"
          sx={{ ml: 1 }}
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
