// REACT
import { useState } from "react";
import type { FC } from "react";

// PUBLIC MODULES
import {
  Dialog,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";

// LOCAL FILES
// Components
import { SelectedVillager } from "features/combat/components";
import {
  OutcomeIconWithText,
  StyledButton,
  StyledContainer,
} from "features/common/components";
// Constants
import { PLAYER_ID_TO_MILITARY_STRENGTH } from "features/combat/constants";
import { ID_TO_VILLAGER } from "features/villager/constants";
// Hooks
import { useEnemyDisplayMilitaryStrength } from "features/combat/hooks";
import { useAppDispatch, useAppSelector } from "features/redux/hooks";
// Icons & Images
import { archery, handToHand, mounted } from "assets/combat";
import { villagerIcon } from "assets/villager";
// Interfaces & Types
import type { BattleOutcome } from "features/combat/types";
// Redux
import {
  completeBattle,
  selectAttackingPlayerId,
} from "features/combat/combatSlice";
import { setView } from "features/game/gameSlice";
import { selectPlayerVillagers } from "features/town/townSlice";
// Utility functions
import {
  determineBattleOutcome,
  getMilitaryStrength,
} from "features/combat/utils";

export const TownCombat: FC<{}> = () => {
  // Hooks
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const villagers = useAppSelector(selectPlayerVillagers);
  const enemyPlayerId = useAppSelector(selectAttackingPlayerId);
  const enemyDisplayMilitaryStrength =
    useEnemyDisplayMilitaryStrength(enemyPlayerId);

  // Local state
  const [selectedVillagerIds, setSelectedVillagerIds] = useState<
    (number | null)[]
  >([null, null, null, null, null]);
  const [modalArmyPosition, setModalArmyPosition] = useState<
    number | null
  >(null);
  const [battleOutcome, setBattleOutcome] =
    useState<BattleOutcome | null>(null);

  // Derived variables
  const playerMilitaryStrength = getMilitaryStrength(
    selectedVillagerIds,
  );
  const enemyMilitaryStrength =
    PLAYER_ID_TO_MILITARY_STRENGTH[enemyPlayerId || NaN];
  let battleOutcomeText = "";
  let battleOutcomeTextColour = "";
  if (battleOutcome) {
    switch (battleOutcome.victoryState) {
      case "Defeat":
        battleOutcomeText = "Your army was defeated";
        battleOutcomeTextColour = "error.main";
        break;
      case "Stalemate":
        battleOutcomeText = "The battle ends in a stalemate";
        battleOutcomeTextColour = "error.main";
        break;
      case "Victory":
        battleOutcomeText = "Your army was victorious";
        battleOutcomeTextColour = "success.main";
        break;
    }
  }

  // Handlers
  const onModalPositionSelect = (armyPosition: number) => {
    setModalArmyPosition(armyPosition);
  };

  const onVillagerSelect = (
    armyPosition: number,
    villagerId: number,
  ) => {
    const nextSelectedVillagerIds = [...selectedVillagerIds];
    nextSelectedVillagerIds[armyPosition] = villagerId;
    setSelectedVillagerIds(nextSelectedVillagerIds);
  };

  const onModalClose = () => {
    setModalArmyPosition(null);
  };

  const onClearSelection = (armyPosition: number) => {
    const nextSelectedVillagerIds = [...selectedVillagerIds];
    nextSelectedVillagerIds[armyPosition] = null;
    setSelectedVillagerIds(nextSelectedVillagerIds);
  };

  const onRetreat = () => {
    dispatch(setView("map"));
  };

  const onAttack = () => {
    setBattleOutcome(
      determineBattleOutcome(
        playerMilitaryStrength,
        enemyPlayerId as number,
        enemyMilitaryStrength,
        selectedVillagerIds as number[],
      ),
    );
  };

  const onCompleteBattle = () => {
    dispatch(completeBattle(battleOutcome as BattleOutcome));
  };

  return (
    <StyledContainer>
      <Grid container direction="column">
        <Typography component="h1" variant="h4">
          Choose Your Army
        </Typography>
      </Grid>

      {villagers.length === 0 && (
        <Typography color="error" variant="body2">
          No villagers available for selection
        </Typography>
      )}

      {villagers.length !== 0 && (
        <Grid container spacing={1} wrap="nowrap">
          <SelectedVillager
            villagerId={selectedVillagerIds[0]}
            armyPosition={0}
            onSelect={onModalPositionSelect}
            onClearSelection={onClearSelection}
            disabled={battleOutcome !== null}
          />
          <SelectedVillager
            villagerId={selectedVillagerIds[1]}
            armyPosition={1}
            onSelect={onModalPositionSelect}
            onClearSelection={onClearSelection}
            disabled={battleOutcome !== null}
          />
          <SelectedVillager
            villagerId={selectedVillagerIds[2]}
            armyPosition={2}
            onSelect={onModalPositionSelect}
            onClearSelection={onClearSelection}
            disabled={battleOutcome !== null}
          />
          <SelectedVillager
            villagerId={selectedVillagerIds[3]}
            armyPosition={3}
            onSelect={onModalPositionSelect}
            onClearSelection={onClearSelection}
            disabled={battleOutcome !== null}
          />
          <SelectedVillager
            villagerId={selectedVillagerIds[4]}
            armyPosition={4}
            onSelect={onModalPositionSelect}
            onClearSelection={onClearSelection}
            disabled={battleOutcome !== null}
          />
        </Grid>
      )}

      <Divider sx={{ mt: 2 }} />

      <Grid container sx={{ mt: 2 }}>
        <Grid alignItems="center" container item xs={6}>
          <Typography component="h2" sx={{ mr: 2 }} variant="h5">
            Your Military Strength
          </Typography>
          <img
            src={handToHand}
            style={{
              width: 32,
              height: 32,
            }}
          />
          <Typography sx={{ ml: 1 }} variant="body2">
            {playerMilitaryStrength.handToHand}
          </Typography>
          <img
            src={archery}
            style={{
              width: 32,
              height: 32,
              marginLeft: theme.spacing(1),
            }}
          />
          <Typography sx={{ ml: 1 }} variant="body2">
            {playerMilitaryStrength.archery}
          </Typography>
          <img
            src={mounted}
            style={{
              width: 32,
              height: 32,
              marginLeft: theme.spacing(1),
            }}
          />
          <Typography sx={{ ml: 1 }} variant="body2">
            {playerMilitaryStrength.mounted}
          </Typography>
        </Grid>

        <Grid alignItems="center" container item xs={6}>
          <Typography component="h2" sx={{ mr: 2 }} variant="h5">
            Enemy Military Strength
          </Typography>
          <img
            src={handToHand}
            style={{
              width: 32,
              height: 32,
            }}
          />
          <Typography sx={{ ml: 1 }} variant="body2">
            {enemyDisplayMilitaryStrength.handToHand}
          </Typography>
          <img
            src={archery}
            style={{
              width: 32,
              height: 32,
              marginLeft: theme.spacing(1),
            }}
          />
          <Typography sx={{ ml: 1 }} variant="body2">
            {enemyDisplayMilitaryStrength.archery}
          </Typography>
          <img
            src={mounted}
            style={{
              width: 32,
              height: 32,
              marginLeft: theme.spacing(1),
            }}
          />
          <Typography sx={{ ml: 1 }} variant="body2">
            {enemyDisplayMilitaryStrength.mounted}
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ mt: 2 }} />

      {!battleOutcome && (
        <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
          <StyledButton onClick={onRetreat}>Retreat</StyledButton>
          <StyledButton
            disabled={
              selectedVillagerIds.filter(
                (villagerId) => villagerId !== null,
              ).length !== 5
            }
            onClick={onAttack}
          >
            Attack
          </StyledButton>
        </Grid>
      )}

      {battleOutcome && (
        <>
          <Grid container direction="column" sx={{ mt: 2 }}>
            <Typography
              color={battleOutcomeTextColour}
              component="p"
              variant="h5"
            >
              {battleOutcomeText}
            </Typography>
            {battleOutcome.villagers.length !== 0 && (
              <Grid container spacing={1} sx={{ mt: 1 }}>
                {battleOutcome.villagers.map((armyVillager) => {
                  const { id, state } = armyVillager;
                  const { name, occupation, icons } =
                    ID_TO_VILLAGER[armyVillager.id];
                  const isPositive = [
                    "healthy",
                    "recovering",
                  ].includes(state);
                  return (
                    <OutcomeIconWithText
                      key={id}
                      icon={icons[state]}
                      isPositive={isPositive}
                      text={`${name} the ${occupation} ${
                        state === "healthy"
                          ? "survived"
                          : `is ${state}`
                      }`}
                    />
                  );
                })}
              </Grid>
            )}
          </Grid>
          <Divider sx={{ mt: 2 }} />
          <StyledButton onClick={onCompleteBattle} sx={{ mt: 2 }}>
            Return to Map
          </StyledButton>
        </>
      )}

      <Dialog
        onClose={onModalClose}
        open={modalArmyPosition !== null}
      >
        <List disablePadding>
          {villagers.map((townVillager) => {
            const villager = ID_TO_VILLAGER[townVillager.id];
            const { id, militaryStrength } = villager;

            const selected = selectedVillagerIds.includes(id);
            const injured = townVillager.state === "injured";
            const dead = townVillager.state === "dead";
            let listItemText = `${villager.name} the ${villager.occupation}`;
            if (selected) {
              listItemText += " (selected)";
            } else if (injured) {
              listItemText += " (injured)";
            } else if (dead) {
              listItemText += " (dead)";
            }

            return (
              <ListItem disableGutters disablePadding key={id}>
                <ListItemButton
                  disabled={selected || injured || dead}
                  onClick={() => {
                    onVillagerSelect(modalArmyPosition as number, id);
                    onModalClose();
                  }}
                >
                  <ListItemIcon>
                    <img src={villagerIcon} />
                  </ListItemIcon>
                  <ListItemText
                    primary={listItemText}
                    primaryTypographyProps={{ variant: "body2" }}
                  />
                  <img
                    src={handToHand}
                    style={{
                      width: 24,
                      height: 24,
                      marginLeft: theme.spacing(1),
                    }}
                  />
                  <Typography sx={{ ml: 1 }} variant="body2">
                    {militaryStrength.handToHand}
                  </Typography>
                  <img
                    src={archery}
                    style={{
                      width: 24,
                      height: 24,
                      marginLeft: theme.spacing(1),
                    }}
                  />
                  <Typography sx={{ ml: 1 }} variant="body2">
                    {militaryStrength.archery}
                  </Typography>
                  <img
                    src={mounted}
                    style={{
                      width: 24,
                      height: 24,
                      marginLeft: theme.spacing(1),
                    }}
                  />
                  <Typography sx={{ ml: 1 }} variant="body2">
                    {militaryStrength.mounted}
                  </Typography>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Dialog>
    </StyledContainer>
  );
};
