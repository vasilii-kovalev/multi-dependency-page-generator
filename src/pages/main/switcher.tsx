import * as React from "react";

import { PageSwitcherProps } from "./types";

const DefaultPage: React.VFC = () => <h2>Default content</h2>;

const PageSwitcher: React.VFC<PageSwitcherProps> = ({
  entity,
  field,
  color,
}) => {
  if (!entity || !field || !color) {
    return <DefaultPage />;
  }

  const { groups: entityGroups } = entity;
  const { groups: fieldGroups } = field;
  const { groups: colorGroups } = color;

  /*
    Expected, that's this is the only place on front-end side where specific
    values are used. That's why there are no any entity/field/color values maps.
    The specific values can be found in `mocks/handlers/(entity/field/color)/*.
  */
  if (entityGroups.includes("default")) {
    if (fieldGroups.includes("default")) {
      return <h2>Default entity-field page</h2>;
    }

    if (fieldGroups.includes("custom")) {
      if (colorGroups.includes("custom")) {
        return <h2>Custom entity-field-color page</h2>;
      }

      return <h2>Custom entity-field page</h2>;
    }

    return <h2>Default entity page</h2>;
  }

  if (entityGroups.includes("custom")) {
    return <h2>Custom entity page</h2>;
  }

  return <DefaultPage />;
};

export { PageSwitcher };
