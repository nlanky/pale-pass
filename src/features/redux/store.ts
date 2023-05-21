// PUBLIC MODULES
import { configureStore } from "@reduxjs/toolkit";

// LOCAL FILES
// Redux
import gameReducer from "features/game/gameSlice";
import townReducer from "features/town/townSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    town: townReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
