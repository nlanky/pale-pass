// PUBLIC MODULES
import { createSlice } from "@reduxjs/toolkit";

// LOCAL FILES
// Constants
import { ID_TO_BUILDING } from "features/building/constants";
import { RESOURCE_TO_TRADE_RATES } from "features/resource/constants";
import { ID_TO_VILLAGER } from "features/villager/constants";
// Interfaces & Types
import type { RootState } from "features/redux/store";
import type { Log } from "features/log/types";
import type { Resource } from "features/resource/types";
// Redux
import { completeBattle } from "features/combat/combatSlice";
import {
  completeEvent,
  triggerEvent,
} from "features/event/eventSlice";
import { setDay } from "features/game/gameSlice";
import { exploreTile } from "features/map/mapSlice";
import { setNameAndPronouns } from "features/player/playerSlice";
import {
  buildBuilding,
  healVillager,
  recruitVillager,
  repairBuilding,
  setTier,
  tradeResources,
} from "features/town/townSlice";

interface LogState {
  logs: Log[];
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
      const newLogs: Log[] = [
        {
          entry: `COMBAT | Attacked player ${enemyPlayerId} | Result: ${victoryState}`,
          shouldNotify: false,
        },
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
        newLogs.push({
          entry: `COMBAT | Injured: ${villagersInjured.join(", ")}`,
          shouldNotify: false,
        });
      }

      if (villagersDead.length !== 0) {
        newLogs.push({
          entry: `COMBAT | Dead: ${villagersInjured.join(", ")}`,
          shouldNotify: false,
        });
      }

      state.logs = [...state.logs, ...newLogs];
    });
    // EVENT
    builder.addCase(triggerEvent, (state, action) => {
      const { id } = action.payload;
      state.logs = [
        ...state.logs,
        {
          entry: `EVENT | Event ID ${id} triggered`,
          shouldNotify: false,
        },
      ];
    });
    builder.addCase(completeEvent, (state, action) => {
      const { resources, resourcesPerDay, buildings, villagers } =
        action.payload;
      const newLogs: Log[] = [
        {
          entry: `EVENT | Event complete`,
          shouldNotify: false,
        },
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
        villagerChanges.push(
          `${villager.name} ${eventVillager.state}`,
        );
      });

      if (resourceChanges.length !== 0) {
        newLogs.push({
          entry: `EVENT | Resource changes: ${resourceChanges.join(
            ", ",
          )}`,
          shouldNotify: false,
        });
      }

      if (rpdChanges.length !== 0) {
        newLogs.push({
          entry: `EVENT | Resource per day changes: ${rpdChanges.join(
            ", ",
          )}`,
          shouldNotify: false,
        });
      }

      if (buildingChanges.length !== 0) {
        newLogs.push({
          entry: `EVENT | Building changes: ${buildingChanges.join(
            ", ",
          )}`,
          shouldNotify: false,
        });
      }

      if (villagerChanges.length !== 0) {
        newLogs.push({
          entry: `EVENT | Villager changes: ${villagerChanges.join(
            ", ",
          )}`,
          shouldNotify: false,
        });
      }

      state.logs = [...state.logs, ...newLogs];
    });
    // GAME
    builder.addCase(setDay, (state, action) => {
      state.logs = [
        ...state.logs,
        {
          entry: `GAME | Day ${action.payload}`,
          shouldNotify: false,
        },
      ];
    });
    // MAP
    builder.addCase(exploreTile, (state, action) => {
      const { x, y, eventId, resources } = action.payload;
      const newLogs: Log[] = [
        {
          entry: `MAP | Explored tile at (${x}, ${y})`,
          shouldNotify: false,
        },
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
        newLogs.push({
          entry: `MAP | Resource changes: ${resourceChanges.join(
            ",",
          )}`,
          shouldNotify: false,
        });
      }

      if (eventId) {
        newLogs.push({
          entry: `MAP | Event ID ${eventId} triggered`,
          shouldNotify: false,
        });
      }

      state.logs = [...state.logs, ...newLogs];
    });
    // PLAYER
    builder.addCase(setNameAndPronouns, (state, action) => {
      const { name, pronouns } = action.payload;
      state.logs = [
        ...state.logs,
        {
          entry: `PLAYER | ${name} starts the game, we wish ${pronouns.third[0].object} the best of luck!`,
          shouldNotify: false,
        },
      ];
    });
    // TOWN
    builder.addCase(setTier, (state, action) => {
      state.logs = [
        ...state.logs,
        {
          entry: `TOWN | Advanced to tier ${action.payload}`,
          shouldNotify: false,
        },
      ];
    });
    builder.addCase(buildBuilding, (state, action) => {
      const building = ID_TO_BUILDING[action.payload];
      state.logs = [
        ...state.logs,
        {
          entry: `TOWN | Started building ${building.name}`,
          shouldNotify: false,
        },
      ];
    });
    builder.addCase(healVillager, (state, action) => {
      const villager = ID_TO_VILLAGER[action.payload];
      state.logs = [
        ...state.logs,
        {
          entry: `TOWN | Started healing ${villager.name} the ${villager.occupation}`,
          shouldNotify: false,
        },
      ];
    });
    builder.addCase(recruitVillager, (state, action) => {
      const villager = ID_TO_VILLAGER[action.payload];
      state.logs = [
        ...state.logs,
        {
          entry: `TOWN | Recruited ${villager.name} the ${villager.occupation}`,
          shouldNotify: false,
        },
      ];
    });
    builder.addCase(repairBuilding, (state, action) => {
      const building = ID_TO_BUILDING[action.payload];
      state.logs = [
        ...state.logs,
        {
          entry: `TOWN | Started repairing ${building.name}`,
          shouldNotify: false,
        },
      ];
    });
    builder.addCase(tradeResources, (state, action) => {
      const { fromResource, toResource, quantity } = action.payload;
      state.logs = [
        ...state.logs,
        {
          entry: `TOWN | Traded ${quantity} ${fromResource} for ${
            RESOURCE_TO_TRADE_RATES[fromResource][toResource] *
            quantity
          } ${toResource}`,
          shouldNotify: false,
        },
      ];
    });
  },
});

// SELECTORS
export const selectLogs = (state: RootState) => state.log.logs;

export const logReducer = logSlice.reducer;
