import { Field as FieldFrontEnd } from "models/field/types";
import { Values } from "types/utils";

import { ENTITY_ID } from "../entity/constants";
import { FIELD_GROUP, FIELD_ID } from "./constants";

type FieldId = Values<typeof FIELD_ID>;

type FieldGroup = Values<typeof FIELD_GROUP> | Values<typeof ENTITY_ID>;

type FieldGroups = FieldGroup[];

interface Field extends FieldFrontEnd {
  id: FieldId;
  groups: FieldGroups;
}

type Fields = Field[];

export type { Field, Fields };
