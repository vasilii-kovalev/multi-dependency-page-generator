import * as React from "react";

import { PAGE_TEMPLATE } from "models/page-config/constants";
import { PageConfig } from "models/page-config/types";

interface Props {
  pageConfig: PageConfig<typeof PAGE_TEMPLATE.usersDefault>;
}

const TemplateDefault: React.VFC<Props> = () => {
  return <h2>Default template</h2>;
};

export { TemplateDefault };
