import { ColorRaw } from "../colors/types";
import { EntityRaw } from "../entity/types";
import { FieldRaw } from "../field/types";

interface RequestBody {
  /*
    Fields are marked as "optional" to create correct validation and thus avoid
    internal server errors.
  */
  entity?: EntityRaw;
  field?: FieldRaw;
  color?: ColorRaw;
}

export type { RequestBody };
