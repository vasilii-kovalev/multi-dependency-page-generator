import * as React from "react";

import { PAGE_TEMPLATE } from "models/page-config/constants";
import { PageConfig } from "models/page-config/types";

interface TemplateProps {
  pageConfig: PageConfig<typeof PAGE_TEMPLATE.colorPicker>;
}

const TemplateColorPicker: React.VFC<TemplateProps> = ({ pageConfig }) => {
  const {
    params: { color },
  } = pageConfig;

  return (
    <>
      <h2>Color picker template</h2>

      <input type="color" defaultValue={color} />
    </>
  );
};

export { TemplateColorPicker };
