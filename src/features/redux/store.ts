// PUBLIC MODULES
import { configureStore } from "@reduxjs/toolkit";

// LOCAL FILES
// Redux
import { buildingReducer } from "features/building/buildingSlice";
import { eventReducer } from "features/event/eventSlice";
import { gameReducer } from "features/game/gameSlice";
import { mapReducer } from "features/map/mapSlice";
import { playerReducer } from "features/player/playerSlice";
import { townReducer } from "features/town/townSlice";
import { villagerReducer } from "features/villager/villagerSlice";

export const store = configureStore({
  reducer: {
    building: buildingReducer,
    event: eventReducer,
    game: gameReducer,
    map: mapReducer,
    player: playerReducer,
    town: townReducer,
    villager: villagerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
