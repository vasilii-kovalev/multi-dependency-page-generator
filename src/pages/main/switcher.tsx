import { Spin } from "antd";
import * as React from "react";

import { PageSwitcherProps } from "./types";
import { usePageConfig } from "hooks/use-page-config";

const DefaultPage: React.VFC = () => <h2>Default content</h2>;

const PageSwitcher: React.VFC<PageSwitcherProps> = ({
  entity,
  field,
  color,
}) => {
  const { data: pageConfig, isLoading: isPageConfigLoading } = usePageConfig({
    entity,
    field,
    color,
  });

  const isDataDefined = [entity, field, color].every(Boolean);

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
