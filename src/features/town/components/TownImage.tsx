// REACT
import type { FC } from "react";

// LOCAL FILES
// Components
import { Image } from "features/common/components";
// Icons & Images
import { townTier1Image } from "assets/town";

export const TownImage: FC<{}> = () => {
  // TODO: Dynamic rendering of town based on tier (and buildings?)
  return <Image src={townTier1Image} style={{ width: "100%" }} />;
};
