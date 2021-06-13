import { Color } from "models/color/types";
import { Entity } from "models/entity/types";
import { Field } from "models/field/types";

interface PageSwitcherProps {
  entity: Entity | undefined;
  field: Field | undefined;
  color: Color | undefined;
}

export type { PageSwitcherProps };
