// PUBLIC MODULES
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import type { PersistorOptions } from "redux-persist";
import storage from "redux-persist/lib/storage";

// LOCAL FILES
// Redux
import { buildingReducer } from "features/building/buildingSlice";
import { combatReducer } from "features/combat/combatSlice";
import { eventReducer } from "features/event/eventSlice";
import { systemReducer } from "features/system/systemSlice";
import { mapReducer } from "features/map/mapSlice";
import { logReducer } from "features/log/logSlice";
import { playerReducer } from "features/player/playerSlice";
import { townReducer } from "features/town/townSlice";
import { villagerReducer } from "features/villager/villagerSlice";

const rootReducer = combineReducers({
  building: buildingReducer,
  combat: combatReducer,
  event: eventReducer,
  log: logReducer,
  map: mapReducer,
  player: playerReducer,
  system: systemReducer,
  town: townReducer,
  villager: villagerReducer,
});

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          REHYDRATE,
        ],
      },
    }),
});
export const persistor = persistStore(store, {
  // Ensures saved game is not loaded without user action
  manualPersist: true,
} as unknown as PersistorOptions);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
