import { Field } from "models/field/types";
import { Values } from "types/utils";

import { ENTITY_ID } from "../entity/constants";
import { FIELD_GROUP, FIELD_ID } from "./constants";

type FieldId = Values<typeof FIELD_ID>;

type FieldGroup = Values<typeof FIELD_GROUP> | Values<typeof ENTITY_ID>;

type FieldGroups = FieldGroup[];

interface FieldRaw extends Field {
  id: FieldId;
  groups: FieldGroups;
}

type FieldsRaw = FieldRaw[];

export type { FieldRaw, FieldsRaw };
