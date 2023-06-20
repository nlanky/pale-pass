// REACT
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

// PUBLIC MODULES
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// LOCAL FILES
// Components
import { Game } from "features/game/components";
// CSS
import "@fontsource/cormorant-garamond";
import "main.css";
// Redux
import { persistor, store } from "features/redux/store";
// Theme
import { theme } from "features/common/theme";

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={<Game />} persistor={persistor}>
          <Game />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);
