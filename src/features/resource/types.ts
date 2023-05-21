export interface Resources {
  wood: number;
  stone: number;
  iron: number;
  steel: number;
  mythril: number;
  amethyst: number;
}

export type Resource = keyof Resources;
