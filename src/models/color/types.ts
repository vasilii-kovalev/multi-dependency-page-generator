import { Values } from "types/utils";

import { COLOR } from "./constants";

type Color = Values<typeof COLOR>;

type Colors = Color[];

export type { Color, Colors };
