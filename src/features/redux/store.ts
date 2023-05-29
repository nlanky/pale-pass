// PUBLIC MODULES
import { configureStore } from "@reduxjs/toolkit";

// LOCAL FILES
// Redux
import { buildingReducer } from "features/building/buildingSlice";
import { eventReducer } from "features/event/eventSlice";
import { gameReducer } from "features/game/gameSlice";
import { townReducer } from "features/town/townSlice";
import { villagerReducer } from "features/villager/villagerSlice";

export const store = configureStore({
  reducer: {
    building: buildingReducer,
    event: eventReducer,
    game: gameReducer,
    town: townReducer,
    villager: villagerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
