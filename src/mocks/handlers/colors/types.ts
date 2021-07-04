import { Color as ColorFrontEnd } from "models/color/types";
import { Values } from "types/utils";

import { COLOR_GROUP, COLOR_ID } from "./constants";

type ColorId = Values<typeof COLOR_ID>;

type ColorGroup = Values<typeof COLOR_GROUP>;

type ColorGroups = ColorGroup[];

interface Color extends ColorFrontEnd {
  id: ColorId;
  groups: ColorGroups;
}

type Colors = Color[];

export type { Color, Colors };
