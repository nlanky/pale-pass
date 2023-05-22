export interface Resources {
  Wood: number;
  Stone: number;
  Iron: number;
  Steel: number;
  Mythril: number;
  Amethyst: number;
}

export type Resource = keyof Resources;
