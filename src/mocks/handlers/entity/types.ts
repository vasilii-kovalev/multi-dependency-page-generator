import { Entity } from "models/entity/types";
import { Values } from "types/utils";

import { ENTITY_GROUP, ENTITY_ID } from "./constants";

type EntityId = Values<typeof ENTITY_ID>;

type EntityGroup = Values<typeof ENTITY_GROUP>;

type EntityGroups = EntityGroup[];

interface EntityRaw extends Entity {
  id: EntityId;
  groups: EntityGroups;
}

type EntitiesRaw = EntityRaw[];

export type { EntityRaw, EntitiesRaw };
