// LOCAL FILES
// Interfaces & Types
import { Dimensions } from "features/common/types";

export const getWindowDimensions = (): Dimensions => ({
  width: window.innerWidth,
  height: window.innerHeight,
});
