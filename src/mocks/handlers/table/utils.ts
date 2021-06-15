import { ResponseComposition, RestContext } from "msw";

import { DEFAULT_DELAY } from "mocks/constants";

import { TABLE_ID } from "./constants";
import { TableData } from "./types";

interface HandleTableIdParams {
  context: RestContext;
  response: ResponseComposition;
  tableId: string;
}

const handleTableId = ({ context, response, tableId }: HandleTableIdParams) => {
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

  return null;
};

export { handleTableId };
