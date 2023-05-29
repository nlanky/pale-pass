// REACT
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

// PUBLIC MODULES
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";

// LOCAL FILES
// Components
import { Game } from "features/game/components";
// CSS
import "@fontsource/cormorant-garamond";
import "main.css";
// Redux
import { store } from "features/redux/store";
// Theme
import { theme } from "features/common/theme";

ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Game />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);
