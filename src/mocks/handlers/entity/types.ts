import { Entity as EntityFrontEnd } from "models/entity/types";
import { Values } from "types/utils";

import { ENTITY_GROUP, ENTITY_ID } from "./constants";

type EntityId = Values<typeof ENTITY_ID>;

type EntityGroup = Values<typeof ENTITY_GROUP>;

type EntityGroups = EntityGroup[];

interface Entity extends EntityFrontEnd {
  id: EntityId;
  groups: EntityGroups;
}

type Entities = Entity[];

export type { Entity, Entities };
