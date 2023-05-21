// LOCAL FILES
// Interfaces & Types
import type { Resource, Resources } from "features/resource/types";

export const mergeResources = (
  resources1: Resources,
  resources2: Resources,
): Resources => {
  const mergedResources = { ...resources1 };
  for (const resource in resources2) {
    mergedResources[resource as Resource] +=
      resources2[resource as Resource];
  }

  return mergedResources;
};
