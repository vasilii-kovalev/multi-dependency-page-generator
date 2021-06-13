import { Values } from "types/utils";

import { ENTITY } from "./constants";

type Entity = Values<typeof ENTITY>;

type Entities = Entity[];

export type { Entity, Entities };
