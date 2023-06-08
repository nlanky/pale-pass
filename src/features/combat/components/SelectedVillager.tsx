// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Grid, Typography } from "@mui/material";

// LOCAL FILES
// Components
import { StyledButton } from "features/common/components";
// Constants
import { ID_TO_VILLAGER } from "features/villager/constants";
// Icons & Images
import { archery, handToHand, mounted } from "assets/combat";
import { villagerIcon } from "assets/villager";

interface SelectedVillagerProps {
  villagerId: number | null;
  armyPosition: number;
  onSelect: (armyPosition: number) => void;
  onClearSelection: (armyPosition: number) => void;
  disabled: boolean;
}

export const SelectedVillager: FC<SelectedVillagerProps> = ({
  villagerId,
  armyPosition,
  onSelect,
  onClearSelection,
  disabled,
}) => {
  // Derived variables
  const villager = ID_TO_VILLAGER[villagerId || NaN];

  return (
    <Grid
      alignItems="center"
      container
      direction="column"
      item
      justifyContent="center"
    >
      {villager && (
        <>
          <img
            src={villagerIcon}
            style={{ width: 128, height: 128 }}
          />
          <Typography
            align="center"
            variant="body2"
          >{`${villager.name} the ${villager.occupation}`}</Typography>
          <Grid container item justifyContent="center" sx={{ mt: 1 }}>
            <img src={handToHand} style={{ width: 32, height: 32 }} />
            <Typography component="span" sx={{ ml: 1 }} variant="h5">
              {villager.militaryStrength.handToHand}
            </Typography>
          </Grid>
          <Grid container item justifyContent="center" sx={{ mt: 1 }}>
            <img src={archery} style={{ width: 32, height: 32 }} />
            <Typography component="span" sx={{ ml: 1 }} variant="h5">
              {villager.militaryStrength.archery}
            </Typography>
          </Grid>
          <Grid container item justifyContent="center" sx={{ mt: 1 }}>
            <img src={mounted} style={{ width: 32, height: 32 }} />
            <Typography component="span" sx={{ ml: 1 }} variant="h5">
              {villager.militaryStrength.mounted}
            </Typography>
          </Grid>
          <StyledButton
            disabled={disabled}
            onClick={() => {
              onClearSelection(armyPosition);
            }}
            sx={{ mt: 2.5 }}
          >
            Clear selection
          </StyledButton>
        </>
      )}
      {!villager && (
        <StyledButton
          disabled={disabled}
          onClick={() => {
            onSelect(armyPosition);
          }}
          sx={{ mt: 1 }}
        >
          Select
        </StyledButton>
      )}
    </Grid>
  );
};
