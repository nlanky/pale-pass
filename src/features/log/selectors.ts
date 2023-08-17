// LOCAL FILES
// Interfaces & Types
import type { RootState } from "features/redux/store";

export const selectLogs = (state: RootState) => state.log.logs;
