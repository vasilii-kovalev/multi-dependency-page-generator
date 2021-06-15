import { getColors } from "./colors";
import { getEntities } from "./entity";
import { getFields } from "./field";
import { getPageConfig } from "./page-config";
import { getTableData } from "./table";

const handlers = [
  getEntities,
  getFields,
  getColors,
  getPageConfig,
  getTableData,
];

export { handlers };
