export interface Resources {
    wood: number;
    stone: number;
    iron: number;
    steel: number;
    mythril: number;
    amethysts: number;
}

export type Resource = keyof Resources;
