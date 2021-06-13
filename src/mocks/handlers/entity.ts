import { rest } from "msw";

import { Entities } from "models/entity/types";
import { getEntitiesEndpoint } from "services/entity";

import { DEFAULT_DELAY } from "../constants";

const getEntities = rest.get(
  getEntitiesEndpoint,
  (request, response, context) => {
    const entities: Entities = ["posts", "users"];

    return response(
      context.status(200),
      context.delay(DEFAULT_DELAY),
      context.json(entities),
    );
  },
);

export { getEntities };
