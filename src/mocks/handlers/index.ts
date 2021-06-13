import { getColors } from "./colors";
import { getEntities } from "./entity";
import { getFields } from "./field";

const handlers = [getEntities, getFields, getColors];

export { handlers };
