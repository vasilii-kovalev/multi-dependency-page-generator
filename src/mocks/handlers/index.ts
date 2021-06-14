import { getColors } from "./colors";
import { getEntities } from "./entity";
import { getFields } from "./field";
import { getPageConfig } from "./page-config";

const handlers = [getEntities, getFields, getColors, getPageConfig];

export { handlers };
