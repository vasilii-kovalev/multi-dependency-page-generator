import { ColorRaw } from "../colors/types";
import { EntityRaw } from "../entity/types";
import { FieldRaw } from "../field/types";

interface RequestBody {
  entity: EntityRaw;
  field: FieldRaw;
  color: ColorRaw;
}

export type { RequestBody };
