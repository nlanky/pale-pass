// PUBLIC MODULES
import { configureStore } from "@reduxjs/toolkit";

// LOCAL FILES
// Redux
import { eventReducer } from "features/event/eventSlice";
import { gameReducer } from "features/game/gameSlice";
import { townReducer } from "features/town/townSlice";

export const store = configureStore({
  reducer: {
    event: eventReducer,
    game: gameReducer,
    town: townReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;