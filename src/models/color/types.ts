type ColorId = string;

type ColorGroup = string;

type ColorGroups = ColorGroup[];
interface Color {
  name: string;
  id: ColorId;
  groups: ColorGroups;
}

type Colors = Color[];

export type { Color, ColorId, Colors };
