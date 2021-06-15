import { TableColumns, TablePermissions } from "models/table/types";
import { Values } from "types/utils";

import { TABLE_ID } from "./constants";

type TableId = Values<typeof TABLE_ID>;

type TableDataItem = Record<string, string | boolean | number>;

type TableData = TableDataItem[];

export type { TableColumns, TableData, TableId, TablePermissions };
