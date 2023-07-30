// REACT
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

// PUBLIC MODULES
import { ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// LOCAL FILES
// Components
import { Game } from "features/game/components";
import {
  TownBuildingNotification,
  TownVillagerNotification,
} from "features/town/components";
// CSS
import "@fontsource/cormorant-garamond";
import "main.css";
// Interfaces & Types
import type { BuildingNotificationType } from "features/building/types";
import type { VillagerNotificationType } from "features/villager/types";
// Redux
import { persistor, store } from "features/redux/store";
// Theme
import { theme } from "features/common/theme";

declare module "notistack" {
  interface VariantOverrides {
    building: {
      buildingId: number;
      type: BuildingNotificationType;
    };
    villager: {
      villagerId: number;
      type: VillagerNotificationType;
    };
  }
}

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={<Game />} persistor={persistor}>
          <SnackbarProvider
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            Components={{
              building: TownBuildingNotification,
              villager: TownVillagerNotification,
            }}
            maxSnack={10}
          >
            <Game />
          </SnackbarProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);
