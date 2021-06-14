import { Color } from "models/color/types";
import { Values } from "types/utils";

import { COLOR_ID, COLOR_GROUP } from "./constants";

type ColorId = Values<typeof COLOR_ID>;

type ColorGroup = Values<typeof COLOR_GROUP>;

type ColorGroups = ColorGroup[];

interface ColorRaw extends Color {
  id: ColorId;
  groups: ColorGroups;
}

type ColorsRaw = ColorRaw[];

export type { ColorsRaw };
