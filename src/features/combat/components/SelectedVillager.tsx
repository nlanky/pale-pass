// REACT
import type { FC } from "react";

// PUBLIC MODULES
import { Grid, Typography, useTheme } from "@mui/material";

// LOCAL FILES
// Components
import { Image, StyledButton } from "features/common/components";
import { VillagerAvatar } from "features/villager/components";
// Constants
import { ID_TO_VILLAGER } from "features/villager/constants";
// Icons & Images
import { archery, handToHand, mounted } from "assets/combat";

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
  // Hooks
  const theme = useTheme();

  // Derived variables
  const villager = ID_TO_VILLAGER[villagerId || NaN];

  return (
    <Grid
      alignItems="center"
      container
      direction="column"
      item
      justifyContent="space-between"
    >
      {villager && (
        <>
          <VillagerAvatar
            villagerId={villagerId || NaN}
            hideStateText
          />

          <Typography
            align="center"
            sx={{ mt: 1 }}
            variant="body2"
          >{`${villager.name} the ${villager.occupation}`}</Typography>

          <Grid item>
            <Grid
              container
              item
              justifyContent="center"
              sx={{ mt: 1.5 }}
            >
              <Image
                src={handToHand}
                style={{ width: 32, height: 32 }}
              />
              <Typography
                component="span"
                sx={{ ml: 1 }}
                variant="h5"
              >
                {villager.militaryStrength.handToHand}
              </Typography>
            </Grid>
            <Grid
              container
              item
              justifyContent="center"
              sx={{ mt: 1 }}
            >
              <Image
                src={archery}
                style={{ width: 32, height: 32 }}
              />
              <Typography
                component="span"
                sx={{ ml: 1 }}
                variant="h5"
              >
                {villager.militaryStrength.archery}
              </Typography>
            </Grid>
            <Grid
              container
              item
              justifyContent="center"
              sx={{ mt: 1 }}
            >
              <Image
                src={mounted}
                style={{ width: 32, height: 32 }}
              />
              <Typography
                component="span"
                sx={{ ml: 1 }}
                variant="h5"
              >
                {villager.militaryStrength.mounted}
              </Typography>
            </Grid>
          </Grid>

          <StyledButton
            disabled={disabled}
            nineSliceStyles={{
              container: { marginTop: theme.spacing(2) },
            }}
            onClick={() => {
              onClearSelection(armyPosition);
            }}
            width={140}
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
          width={72}
        >
          Select
        </StyledButton>
      )}
    </Grid>
  );
};
