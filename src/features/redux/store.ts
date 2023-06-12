// PUBLIC MODULES
import { configureStore } from "@reduxjs/toolkit";

// LOCAL FILES
// Redux
import { buildingReducer } from "features/building/buildingSlice";
import { combatReducer } from "features/combat/combatSlice";
import { eventReducer } from "features/event/eventSlice";
import { gameReducer } from "features/game/gameSlice";
import { mapReducer } from "features/map/mapSlice";
import { logReducer } from "features/log/logSlice";
import { playerReducer } from "features/player/playerSlice";
import { townReducer } from "features/town/townSlice";
import { villagerReducer } from "features/villager/villagerSlice";

export const store = configureStore({
  reducer: {
    building: buildingReducer,
    combat: combatReducer,
    event: eventReducer,
    game: gameReducer,
    log: logReducer,
    map: mapReducer,
    player: playerReducer,
    town: townReducer,
    villager: villagerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
