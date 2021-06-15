import { Values } from "types/utils";

import { TABLE_PERMISSION } from "./constants";

type TableId = string;

interface TableColumn {
  id: string;
  name: string;
}

type TableColumns = TableColumn[];

type TableDataItem = Record<string, string | boolean | number>;

type TableData = TableDataItem[];

type TablePermission = Values<typeof TABLE_PERMISSION>;

type TablePermissions = TablePermission[];

export type { TableColumns, TablePermissions, TableId, TableData };
