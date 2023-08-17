// PUBLIC MODULES
import { createSlice } from "@reduxjs/toolkit";

// LOCAL FILES
// Constants
import { ID_TO_BUILDING } from "features/building/constants";
import { EVENT_ID_TO_EVENT } from "features/event/constants";
import { RESOURCE_TO_TRADE_RATES } from "features/resource/constants";
import { ID_TO_VILLAGER } from "features/villager/constants";
// Interfaces & Types
import type { Resource } from "features/resource/types";
// Redux
import { completeBattle } from "features/combat/actions";
import { completeEvent, triggerEvent } from "features/event/actions";
import { setDay } from "features/system/actions";
import { exploreTile } from "features/map/actions";
import { setNameAndPronouns } from "features/player/actions";
import {
  buildBuilding,
  healVillager,
  recruitVillager,
  repairBuilding,
  setTier,
  tradeResources,
} from "features/town/actions";

interface LogState {
  logs: string[];
}

const initialState: LogState = {
  logs: [],
};

export const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // COMBAT
    builder.addCase(completeBattle, (state, action) => {
      const { enemyPlayerId, victoryState, villagers } =
        action.payload;
      const newLogs: string[] = [
        `COMBAT | Attacked player ${enemyPlayerId} | Result: ${victoryState}`,
      ];

      const villagersInjured: string[] = [];
      const villagersDead: string[] = [];
      villagers.forEach((combatVillager) => {
        const villager = ID_TO_VILLAGER[combatVillager.id];
        switch (combatVillager.state) {
          case "injured":
            villagersInjured.push(
              `${villager.name} the ${villager.occupation}`,
            );
            break;
          case "dead":
            villagersDead.push(
              `${villager.name} the ${villager.occupation}`,
            );
            break;
          default:
            break;
        }
      });

      if (villagersInjured.length !== 0) {
        newLogs.push(
          `COMBAT | Injured: ${villagersInjured.join(", ")}`,
        );
      }

      if (villagersDead.length !== 0) {
        newLogs.push(`COMBAT | Dead: ${villagersInjured.join(", ")}`);
      }

      state.logs = [...state.logs, ...newLogs];
    });
    // EVENT
    builder.addCase(triggerEvent, (state, action) => {
      state.logs = [
        ...state.logs,
        `EVENT | Event ${action.payload} triggered`,
      ];
    });
    builder.addCase(completeEvent, (state, action) => {
      const {
        id: eventId,
        choiceIndex,
        outcomeIndex,
      } = action.payload;
      const event = EVENT_ID_TO_EVENT[eventId];
      const choice = event.choices[choiceIndex];
      const outcome = choice.outcomes[outcomeIndex];
      const { resources, resourcesPerDay, buildings, villagers } =
        outcome;
      const newLogs: string[] = [
        `EVENT | Event: ${event.introductionText}`,
        `EVENT | Choice: ${choice.text}`,
        `EVENT | Outcome: ${outcome.text}`,
      ];

      const resourceChanges: string[] = [];
      (Object.keys(resources) as Resource[]).forEach((resource) => {
        const amount = resources[resource];
        if (amount !== 0) {
          resourceChanges.push(
            `${resource} ${amount > 0 ? "+" : ""}${amount}`,
          );
        }
      });

      const rpdChanges: string[] = [];
      (Object.keys(resourcesPerDay) as Resource[]).forEach(
        (resource) => {
          const amount = resourcesPerDay[resource];
          if (amount !== 0) {
            rpdChanges.push(
              `${resource} ${amount > 0 ? "+" : ""}${amount}`,
            );
          }
        },
      );

      const buildingChanges: string[] = [];
      buildings.forEach((eventBuilding) => {
        const building = ID_TO_BUILDING[eventBuilding.id];
        buildingChanges.push(
          `${building.name} ${eventBuilding.state}`,
        );
      });

      const villagerChanges: string[] = [];
      villagers.forEach((eventVillager) => {
        const villager = ID_TO_VILLAGER[eventVillager.id];
        const state = `${eventVillager.state
          .slice(0, 1)
          .toUpperCase()}${eventVillager.state.slice(1)}`;
        villagerChanges.push(`${villager.name} (${state})`);
      });

      if (resourceChanges.length !== 0) {
        newLogs.push(
          `EVENT | Resource changes: ${resourceChanges.join(", ")}`,
        );
      }

      if (rpdChanges.length !== 0) {
        newLogs.push(
          `EVENT | Resource per day changes: ${rpdChanges.join(
            ", ",
          )}`,
        );
      }

      if (buildingChanges.length !== 0) {
        newLogs.push(
          `EVENT | Building changes: ${buildingChanges.join(", ")}`,
        );
      }

      if (villagerChanges.length !== 0) {
        newLogs.push(
          `EVENT | Villager changes: ${villagerChanges.join(", ")}`,
        );
      }

      state.logs = [...state.logs, ...newLogs];
    });
    // GAME
    builder.addCase(setDay, (state, action) => {
      state.logs = [...state.logs, `GAME | Day ${action.payload}`];
    });
    // MAP
    builder.addCase(exploreTile, (state, action) => {
      const { x, y, eventId, resources } = action.payload;
      const newLogs: string[] = [
        `MAP | Explored tile at (${x}, ${y})`,
      ];

      const resourceChanges: string[] = [];
      if (resources) {
        (Object.keys(resources) as Resource[]).forEach((resource) => {
          const amount = resources[resource];
          if (amount !== 0) {
            resourceChanges.push(
              `${resource} ${amount > 0 ? "+" : ""}${amount}`,
            );
          }
        });
      }

      if (resourceChanges.length !== 0) {
        newLogs.push(
          `MAP | Resource changes: ${resourceChanges.join(",")}`,
        );
      }

      if (eventId) {
        newLogs.push(`MAP | Event ${eventId} triggered`);
      }

      state.logs = [...state.logs, ...newLogs];
    });
    // PLAYER
    builder.addCase(setNameAndPronouns, (state, action) => {
      const { name, pronouns } = action.payload;
      state.logs = [
        ...state.logs,
        `PLAYER | ${name} starts the game, we wish ${pronouns.third[0].object} the best of luck!`,
      ];
    });
    // TOWN
    builder.addCase(setTier, (state, action) => {
      state.logs = [
        ...state.logs,
        `TOWN | Advanced to tier ${action.payload}`,
      ];
    });
    builder.addCase(buildBuilding, (state, action) => {
      const building = ID_TO_BUILDING[action.payload];
      state.logs = [
        ...state.logs,
        `TOWN | Started building ${building.name}`,
      ];
    });
    builder.addCase(healVillager, (state, action) => {
      const villager = ID_TO_VILLAGER[action.payload];
      state.logs = [
        ...state.logs,
        `TOWN | Started healing ${villager.name} the ${villager.occupation}`,
      ];
    });
    builder.addCase(recruitVillager, (state, action) => {
      const villager = ID_TO_VILLAGER[action.payload];
      state.logs = [
        ...state.logs,
        `TOWN | Recruited ${villager.name} the ${villager.occupation}`,
      ];
    });
    builder.addCase(repairBuilding, (state, action) => {
      const building = ID_TO_BUILDING[action.payload];
      state.logs = [
        ...state.logs,
        `TOWN | Started repairing ${building.name}`,
      ];
    });
    builder.addCase(tradeResources, (state, action) => {
      const { fromResource, toResource, quantity } = action.payload;
      state.logs = [
        ...state.logs,
        `TOWN | Traded ${quantity} ${fromResource} for ${
          RESOURCE_TO_TRADE_RATES[fromResource][toResource] * quantity
        } ${toResource}`,
      ];
    });
  },
});

export const logReducer = logSlice.reducer;
