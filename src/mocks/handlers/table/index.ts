import { rest } from "msw";

import { DEFAULT_DELAY } from "mocks/constants";
import { getTableDataEndpoint, TABLE_ID_QUERY_PARAMETER } from "services/table";

import { handleTableId } from "./utils";

const getTableData = rest.get(
  getTableDataEndpoint,
  (request, response, context) => {
    const tableId = request.url.searchParams.get(TABLE_ID_QUERY_PARAMETER);

    if (tableId === null) {
      return response(
        context.status(400),
        context.delay(DEFAULT_DELAY),
        context.json(`\`${TABLE_ID_QUERY_PARAMETER}\` should be specified`),
      );
    }

    const handleTableIdResult = handleTableId({ context, response, tableId });

    if (handleTableIdResult !== null) {
      return handleTableIdResult;
    }

    return response(
      context.status(404),
      context.json(`Unknown \`${TABLE_ID_QUERY_PARAMETER}\` value: ${tableId}`),
    );
  },
);

export { getTableData };
