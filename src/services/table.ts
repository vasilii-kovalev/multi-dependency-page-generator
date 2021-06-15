import { TableColumns, TableId } from "models/table/types";
import { getEndpoint } from "utils/get-endpoint";

import { api } from "./api";

const getTableDataEndpoint = getEndpoint(["page-config"]);

const TABLE_ID_QUERY_PARAMETER = "tableId";

interface QueryParameters {
  [TABLE_ID_QUERY_PARAMETER]: TableId;
}

const getTableData = async (tableId: TableId): Promise<TableColumns> => {
  const query: QueryParameters = {
    [TABLE_ID_QUERY_PARAMETER]: tableId,
  };

  const { data } = await api.get<TableColumns>(getTableDataEndpoint, {
    params: query,
  });

  return data;
};

export { TABLE_ID_QUERY_PARAMETER, getTableData, getTableDataEndpoint };
