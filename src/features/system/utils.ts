/**
 * Checks local storage for a previously saved game state. If player has
 * set their name, it means they have previously started a game. Otherwise,
 * they can start over.
 */
export const hasSavedGame = () => {
  const reduxStoreStateJson = localStorage.getItem("persist:root");
  if (!reduxStoreStateJson) {
    return false;
  }

  const reduxStoreState = JSON.parse(reduxStoreStateJson);
  const playerState = JSON.parse(reduxStoreState["player"]);
  return playerState["name"] !== "";
};

export const getGameDetailsFromLocalStorage = () => {
  const reduxStoreStateJson = localStorage.getItem("persist:root");
  if (!reduxStoreStateJson) {
    return {
      day: 0,
      name: "",
    };
  }

  const reduxStoreState = JSON.parse(reduxStoreStateJson);
  const gameState = JSON.parse(reduxStoreState["game"]);
  const playerState = JSON.parse(reduxStoreState["player"]);
  return {
    day: gameState["day"],
    name: playerState["name"],
  };
};
