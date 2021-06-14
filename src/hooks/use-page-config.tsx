import { Color } from "models/color/types";
import { Entity } from "models/entity/types";
import { Field } from "models/field/types";
import { useQuery } from "react-query";
import { PAGE_CONFIG_QUERY_KEY } from "models/page-config/constants";
import { getPageConfig } from "services/page-config";

interface Props {
  entity?: Entity;
  field?: Field;
  color?: Color;
  enabled?: boolean;
}

const usePageConfig = ({ entity, field, color, enabled = true }: Props) => {
  return useQuery(
    [
      PAGE_CONFIG_QUERY_KEY,
      {
        entityId: entity?.id,
        fieldId: field?.id,
        colorId: color?.id,
      },
    ],
    () => {
      // Undefined is impossible because of `enabled` condition.
      const entityTyped = entity as Entity;
      const fieldTyped = field as Field;
      const colorTyped = color as Color;

      return getPageConfig({
        entity: entityTyped,
        field: fieldTyped,
        color: colorTyped,
      });
    },
    {
      enabled,
    },
  );
};

export { usePageConfig };
