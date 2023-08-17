// PUBLIC MODULES
import { createSlice } from "@reduxjs/toolkit";

// LOCAL FILES
// Constants
import { ID_TO_BUILDING } from "features/building/constants";
import { EVENT_ID_TO_EVENT } from "features/event/constants";
import {
  NO_RESOURCES,
  RESOURCE_TO_TRADE_RATES,
} from "features/resource/constants";
import { TIER_TO_REQUIREMENTS } from "features/tier/constants";
import { VILLAGER_RECOVERY_DAYS } from "features/villager/constants";
// Interfaces & Types
import type { Town } from "features/town/types";
// Redux
import { completeBattle } from "features/combat/actions";
import { completeEvent } from "features/event/actions";
import { setDay } from "features/system/actions";
import { exploreTile } from "features/map/actions";
import {
  buildBuilding,
  healVillager,
  recruitVillager,
  repairBuilding,
  setTier,
  tradeResources,
} from "features/town/actions";
// Utility functions
import {
  getResources,
  mergeResources,
} from "features/resource/utils";
import {
  getNumberOfBuilders,
  getNumberOfHealers,
  getTownResourcesPerDay,
} from "features/town/utils";

interface TownState extends Town {}

const initialState: TownState = {
  playerId: 1,
  tier: 1,
  resources: NO_RESOURCES,
  buildingIdToBuilding: {},
  villagerIdToVillager: {},
  completedEvents: [],
  image: "",
};

export const townSlice = createSlice({
  name: "town",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setTier, (state, action) => {
        const newTier = action.payload;

        // Player pays cost in resources to advance tier
        state.resources = mergeResources(
          state.resources,
          TIER_TO_REQUIREMENTS[newTier].resources,
        );

        // Assign new tier
        state.tier = newTier;
      })
      .addCase(tradeResources, (state, action) => {
        const { fromResource, toResource, quantity } = action.payload;
        const resourceChanges = getResources({
          [fromResource]: -quantity,
          [toResource]:
            quantity *
            RESOURCE_TO_TRADE_RATES[fromResource][toResource],
        });
        state.resources = mergeResources(
          state.resources,
          resourceChanges,
        );
      })
      .addCase(buildBuilding, (state, action) => {
        const buildingId = action.payload;
        const { id, buildTime, buildResources } =
          ID_TO_BUILDING[buildingId];
        const nextBuildingIdToBuilding = {
          ...state.buildingIdToBuilding,
        };

        // Check if this building is in town but destroyed
        if (nextBuildingIdToBuilding[buildingId]) {
          // Start rebuild
          nextBuildingIdToBuilding[buildingId].state =
            "under construction";
        } else {
          // Start construction of new building
          const numberOfBuilders = getNumberOfBuilders(
            state.villagerIdToVillager,
          );
          nextBuildingIdToBuilding[buildingId] = {
            id,
            state: "under construction",
            buildTimeRemaining: Math.max(
              buildTime - numberOfBuilders,
              1,
            ),
            repairTimeRemaining: 0,
          };
        }

        state.buildingIdToBuilding = nextBuildingIdToBuilding;
        state.resources = mergeResources(
          { ...state.resources },
          buildResources,
        );
      })
      .addCase(repairBuilding, (state, action) => {
        const buildingId = action.payload;
        const { repairResources } = ID_TO_BUILDING[buildingId];
        const nextBuildingIdToBuilding = {
          ...state.buildingIdToBuilding,
        };
        if (nextBuildingIdToBuilding[buildingId]) {
          nextBuildingIdToBuilding[buildingId].state =
            "being repaired";
        }

        state.buildingIdToBuilding = nextBuildingIdToBuilding;
        state.resources = mergeResources(
          { ...state.resources },
          repairResources,
        );
      })
      .addCase(recruitVillager, (state, action) => {
        const villagerId = action.payload;
        const nextVillagerIdToVillager = {
          ...state.villagerIdToVillager,
        };
        if (!nextVillagerIdToVillager[villagerId]) {
          nextVillagerIdToVillager[villagerId] = {
            id: villagerId,
            state: "healthy",
            recoveryTimeRemaining: 0,
          };
        }

        state.villagerIdToVillager = nextVillagerIdToVillager;
      })
      .addCase(healVillager, (state, action) => {
        const villagerId = action.payload;
        const nextVillagerIdToVillager = {
          ...state.villagerIdToVillager,
        };
        if (nextVillagerIdToVillager[villagerId]) {
          nextVillagerIdToVillager[villagerId].state = "recovering";
        }

        state.villagerIdToVillager = nextVillagerIdToVillager;
      })
      .addCase(setDay, (state) => {
        state.resources = mergeResources(
          state.resources,
          getTownResourcesPerDay(state),
        );

        // Check building repair/building times
        const nextBuildingIdToBuilding = {
          ...state.buildingIdToBuilding,
        };
        Object.entries(nextBuildingIdToBuilding).forEach(
          (buildingEntry) => {
            const buildingId = Number(buildingEntry[0]);
            const nextTownBuilding = { ...buildingEntry[1] };
            const { state } = nextTownBuilding;
            if (state === "under construction") {
              nextTownBuilding.buildTimeRemaining--;
              if (nextTownBuilding.buildTimeRemaining === 0) {
                nextTownBuilding.state = "built";
              }
            } else if (state === "being repaired") {
              nextTownBuilding.repairTimeRemaining--;
              if (nextTownBuilding.repairTimeRemaining === 0) {
                nextTownBuilding.state = "built";
              }
            }
            nextBuildingIdToBuilding[buildingId] = nextTownBuilding;
          },
        );
        state.buildingIdToBuilding = nextBuildingIdToBuilding;

        // Check villager recovery times
        const nextVillagerIdToVillager = {
          ...state.villagerIdToVillager,
        };
        Object.entries(nextVillagerIdToVillager).forEach(
          (villagerEntry) => {
            const villagerId = Number(villagerEntry[0]);
            const nextTownVillager = { ...villagerEntry[1] };
            const { state } = nextTownVillager;
            if (state === "recovering") {
              nextTownVillager.recoveryTimeRemaining--;
              if (nextTownVillager.recoveryTimeRemaining === 0) {
                nextTownVillager.state = "healthy";
              }
            }

            nextVillagerIdToVillager[villagerId] = nextTownVillager;
          },
        );
        state.villagerIdToVillager = nextVillagerIdToVillager;
      })
      .addCase(completeEvent, (state, action) => {
        // Update completed events
        state.completedEvents = [
          ...state.completedEvents,
          action.payload,
        ];

        const {
          id: eventId,
          choiceIndex,
          outcomeIndex,
        } = action.payload;
        const { resources, buildings, villagers } =
          EVENT_ID_TO_EVENT[eventId].choices[choiceIndex].outcomes[
            outcomeIndex
          ];

        // Modify resources
        state.resources = mergeResources(state.resources, resources);

        // Update buildings
        const nextBuildingIdToBuilding = {
          ...state.buildingIdToBuilding,
        };
        const numberOfBuilders = getNumberOfBuilders(
          state.villagerIdToVillager,
        );
        buildings.forEach((eventBuilding) => {
          const { id, state } = eventBuilding;

          // Add/replace building state
          const building = ID_TO_BUILDING[id];
          nextBuildingIdToBuilding[id] = {
            id,
            state,
            buildTimeRemaining:
              state === "destroyed"
                ? Math.max(building.buildTime - numberOfBuilders, 1)
                : 0,
            repairTimeRemaining:
              state === "damaged"
                ? Math.max(building.repairTime - numberOfBuilders, 1)
                : 0,
          };
        });
        state.buildingIdToBuilding = nextBuildingIdToBuilding;

        // Update villagers
        const nextVillagerIdToVillager = {
          ...state.villagerIdToVillager,
        };
        const numberOfHealers = getNumberOfHealers(
          state.villagerIdToVillager,
        );
        villagers.forEach((eventVillager) => {
          const { id, state } = eventVillager;

          // Add/replace villager state
          nextVillagerIdToVillager[id] = {
            id,
            state,
            recoveryTimeRemaining:
              state === "injured"
                ? Math.max(
                    VILLAGER_RECOVERY_DAYS - numberOfHealers,
                    1,
                  )
                : 0,
          };
        });
        state.villagerIdToVillager = nextVillagerIdToVillager;
      })
      .addCase(exploreTile, (state, action) => {
        if (action.payload.resources) {
          const nextResources = mergeResources(
            state.resources,
            action.payload.resources,
          );
          state.resources = nextResources;
        }
      })
      .addCase(completeBattle, (state, action) => {
        const nextVillagerIdToVillager = {
          ...state.villagerIdToVillager,
        };
        const numberOfHealers = getNumberOfHealers(
          state.villagerIdToVillager,
        );
        action.payload.villagers.forEach((villager) => {
          const { id, state } = villager;
          if (nextVillagerIdToVillager[id]) {
            nextVillagerIdToVillager[id] = {
              id,
              state,
              recoveryTimeRemaining:
                state === "injured"
                  ? Math.max(
                      VILLAGER_RECOVERY_DAYS - numberOfHealers,
                      1,
                    )
                  : 0,
            };
          }
        });

        state.villagerIdToVillager = nextVillagerIdToVillager;
      });
  },
});

export const townReducer = townSlice.reducer;
