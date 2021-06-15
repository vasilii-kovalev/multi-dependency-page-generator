import { rest } from "msw";

import { DEFAULT_DELAY } from "mocks/constants";
import { getTableDataEndpoint, TABLE_ID_QUERY_PARAMETER } from "services/table";

import { TABLE_ID } from "./constants";
import { TableData } from "./types";

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

    if (tableId === TABLE_ID.table1) {
      const tableData: TableData = [
        {
          id: 1,
          name: "Leanne Graham",
        },
        {
          id: 2,
          name: "Ervin Howell",
        },
      ];

      return response(
        context.status(200),
        context.delay(DEFAULT_DELAY),
        context.json(tableData),
      );
    }

    if (tableId === TABLE_ID.table2) {
      const tableData: TableData = [
        {
          username: "Bret",
          email: "Sincere@april.biz",
        },
        {
          username: "Antonette",
          email: "Shanna@melissa.tv",
        },
      ];

      return response(
        context.status(200),
        context.delay(DEFAULT_DELAY),
        context.json(tableData),
      );
    }

    if (tableId === TABLE_ID.table3) {
      const tableData: TableData = [
        {
          phone: "-770-736-8031 x56442",
          website: "hildegard.org",
        },
        {
          phone: "010-692-6593 x09125",
          website: "anastasia.net",
        },
      ];

      return response(
        context.status(200),
        context.delay(DEFAULT_DELAY),
        context.json(tableData),
      );
    }

    if (tableId === TABLE_ID.table4) {
      const tableData: TableData = [
        {
          companyName: "Romaguera-Crona",
          addressStreet: "Kulas Light",
        },
        {
          companyName: "Deckow-Crist",
          addressStreet: "Victor Plains",
        },
      ];

      return response(
        context.status(200),
        context.delay(DEFAULT_DELAY),
        context.json(tableData),
      );
    }

    return response(
      context.status(404),
      context.json(`Unknown \`${TABLE_ID_QUERY_PARAMETER}\` value: ${tableId}`),
    );
  },
);

export { getTableData };
