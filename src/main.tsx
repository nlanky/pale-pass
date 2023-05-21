// REACT
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

// PUBLIC MODULES
import { Provider } from "react-redux"

// LOCAL FILES
// Components
import { Game } from "features/game/Game";
// Redux
import { store } from "features/redux/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <Game />
    </Provider>
  </StrictMode>,
);
