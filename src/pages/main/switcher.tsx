import { Spin } from "antd";
import * as React from "react";
import { useQuery } from "react-query";

import { Entity } from "models/entity/types";
import { Field } from "models/field/types";
import { Color } from "models/color/types";
import { PAGE_CONFIG_QUERY_KEY } from "models/page-config/constants";
import { getPageConfig } from "services/page-config";

import { PageSwitcherProps } from "./types";

const DefaultPage: React.VFC = () => <h2>Default content</h2>;

const PageSwitcher: React.VFC<PageSwitcherProps> = ({
  entity,
  field,
  color,
}) => {
  const isDataDefined = [entity, field, color].every(Boolean);

  const { data: pageConfig, isLoading: isPageConfigLoading } = useQuery(
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
      enabled: isDataDefined,
    },
  );

  if (!isDataDefined) {
    return (
      <Spin spinning={isPageConfigLoading} size="large" delay={50}>
        <DefaultPage />
      </Spin>
    );
  }

  return (
    <Spin spinning={isPageConfigLoading} size="large" delay={50}>
      <DefaultPage />
    </Spin>
  );
};

export { PageSwitcher };
