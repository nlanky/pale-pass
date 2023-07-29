// PUBLIC MODULES
import { createSelector, createSlice } from "@reduxjs/toolkit";

// LOCAL FILES
// Constants
import { DAYS_PER_EVENT, EVENTS } from "features/event/constants";
// Interfaces & Types
import type { RootState } from "features/redux/store";
// Redux
import { completeEvent, triggerEvent } from "features/event/actions";
import { selectDay } from "features/game/gameSlice";
import { exploreTile } from "features/map/actions";
import {
  selectTownBuildingIds,
  selectTownResources,
  selectTownTier,
  selectTownVillagerIds,
} from "features/town/townSlice";
// Utility functions
import { getRandomEvent } from "features/event/utils";

interface EventState {
  active: number | null; // ID of active event
  seen: number[]; // List of event IDs user has seen
}

const initialState: EventState = {
  active: null,
  seen: [],
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(completeEvent, (state) => {
        state.active = null;
      })
      .addCase(triggerEvent, (state, action) => {
        const { id } = action.payload;
        state.active = id;
        state.seen = [...state.seen, id];
      })
      .addCase(exploreTile, (state, action) => {
        const eventId = action.payload.eventId;
        if (eventId) {
          const event = EVENTS.find((event) => event.id === eventId);
          if (event) {
            state.active = eventId;
            state.seen = [...state.seen, eventId];
          }
        }
      });
  },
});

// SELECTORS
export const selectSeenEventIds = (state: RootState) =>
  state.event.seen;
export const selectActiveEventId = (state: RootState) =>
  state.event.active;

export const selectActiveEvent = createSelector(
  [selectActiveEventId],
  (eventId) => EVENTS.find((event) => event.id === eventId),
);
/*
  Filter event list to return only valid events. Each event has a set of
  requirements that town must meet. Player must also not have seen event
  before.
*/
export const selectValidEvents = createSelector(
  [
    selectSeenEventIds,
    selectTownTier,
    selectTownResources,
    selectTownBuildingIds,
    selectTownVillagerIds,
  ],
  (
    seenEventIds,
    townTier,
    townResources,
    townBuildingIds,
    townVillagerIds,
  ) =>
    EVENTS.filter((event) => {
      const { id, requirements } = event;
      const { tier, resources, buildingIds, villagerIds } =
        requirements;

      if (seenEventIds.includes(id)) {
        return false;
      }

      if (townTier < tier) {
        return false;
      }

      if (
        townResources.Wood < resources.Wood ||
        townResources.Stone < resources.Stone ||
        townResources.Iron < resources.Iron ||
        townResources.Steel < resources.Steel ||
        townResources.Mythril < resources.Mythril ||
        townResources.Amethyst < resources.Amethyst
      ) {
        return false;
      }

      if (
        !buildingIds.every((buildingId) =>
          townBuildingIds.includes(buildingId),
        )
      ) {
        return false;
      }

      if (
        !villagerIds.every((villagerId) =>
          townVillagerIds.includes(villagerId),
        )
      ) {
        return false;
      }

      return true;
    }),
);
export const selectCanExplore = createSelector(
  [selectDay, selectValidEvents, selectSeenEventIds],
  (day, validEvents, seenEventIds) =>
    day !== 0 &&
    validEvents.length !== 0 &&
    (seenEventIds.length === 0 ||
      Math.ceil(day / seenEventIds.length) > DAYS_PER_EVENT),
);
// Returns random valid event
export const selectValidEvent = createSelector(
  [selectValidEvents],
  (validEvents) =>
    validEvents.length === 0 ? null : getRandomEvent(validEvents),
);

export const eventReducer = eventSlice.reducer;
