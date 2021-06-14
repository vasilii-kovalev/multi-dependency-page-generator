import { rest } from "msw";

import { DEFAULT_DELAY } from "mocks/constants";
import { getEntitiesEndpoint } from "services/entity";

import { EntitiesRaw } from "./types";

const getEntities = rest.get(
  getEntitiesEndpoint,
  (request, response, context) => {
    const entities: EntitiesRaw = [
      {
        name: "Posts",
        id: "posts",
        groups: ["default"],
      },
      {
        name: "Users",
        id: "users",
        groups: ["default"],
      },
      {
        name: "Variables",
        id: "variables",
        groups: ["custom"],
      },
    ];

    return response(
      context.status(200),
      context.delay(DEFAULT_DELAY),
      context.json(entities),
    );
  },
);

export { getEntities };
