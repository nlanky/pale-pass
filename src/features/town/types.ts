// LOCAL FILES
// Interfaces & Types
import type { Building } from "features/building/types";
import type { Resources } from "features/resource/types";
import type { Villager } from "features/villager/types";

export interface Town {
    isPlayer: boolean;
    tier: number;
    resources: Resources;
    buildings: Building[];
    villagers: Villager[];
    image: string; // Path to image location
}
