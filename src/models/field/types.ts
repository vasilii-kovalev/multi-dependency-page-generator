type FieldId = string;

type FieldGroup = string;

type FieldGroups = FieldGroup[];

interface Field {
  name: string;
  id: FieldId;
  groups: FieldGroups;
}

type Fields = Field[];

export type { FieldId, Field, Fields };
