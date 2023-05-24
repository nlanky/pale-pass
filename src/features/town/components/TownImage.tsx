// REACT
import type { FC } from "react";

// LOCAL FILES
// Images
import { townTier1Image } from "assets/town";

export const TownImage: FC<{}> = () => {
  // TODO: Dynamic rendering of town based on tier (and buildings?)
  return <img src={townTier1Image} style={{ width: "100%" }} />;
};
