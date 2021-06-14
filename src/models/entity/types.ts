type EntityId = string;

type EntityGroup = string;

type EntityGroups = EntityGroup[];

interface Entity {
  name: string;
  id: EntityId;
  groups: EntityGroups;
}

type Entities = Entity[];

export type { EntityId, Entity, Entities };
