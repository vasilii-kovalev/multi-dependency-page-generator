import { ResponseComposition, rest, RestContext } from "msw";

import { DEFAULT_DELAY } from "mocks/constants";
import { PAGE_TEMPLATE } from "models/page-config/constants";
import { PageConfig } from "models/page-config/types";
import { getPageConfigEndpoint } from "services/page-config";

import { ENTITY_ID } from "../entity/constants";
import { EntityRaw } from "../entity/types";
import { RequestBody } from "./types";

const handleEntityOnly = (
  response: ResponseComposition,
  context: RestContext,
  entity: EntityRaw,
) => {
  const { id: entityId } = entity;

  if (entityId === ENTITY_ID.users) {
    const pageConfig: PageConfig<typeof PAGE_TEMPLATE.usersDefault> = {
      template: PAGE_TEMPLATE.usersDefault,
      params: {
        urls: ["https://jsonplaceholder.typicode.com/", "https://pokeapi.co/"],
      },
    };

    return response(
      context.status(200),
      context.delay(DEFAULT_DELAY),
      context.json(pageConfig),
    );
  }

  if (entityId === ENTITY_ID.variables) {
    const pageConfig: PageConfig<typeof PAGE_TEMPLATE.custom> = {
      template: PAGE_TEMPLATE.custom,
    };

    return response(
      context.status(200),
      context.delay(DEFAULT_DELAY),
      context.json(pageConfig),
    );
  }

  return null;
};

const isValidEntity = (entity: EntityRaw | undefined): entity is EntityRaw =>
  Object.values(ENTITY_ID).includes(entity?.id as EntityRaw["id"]);

const getPageConfig = rest.post<RequestBody>(
  getPageConfigEndpoint,
  (request, response, context) => {
    const { entity } = request.body;

    if (!isValidEntity(entity)) {
      return response(
        context.status(400),
        context.delay(DEFAULT_DELAY),
        context.json(`Incorrect entity: ${entity}`),
      );
    }

    // More specific first, less specific last.
    const handleEntityOnlyResult = handleEntityOnly(response, context, entity);

    if (handleEntityOnlyResult !== null) {
      return handleEntityOnlyResult;
    }

    const fallbackPageConfig: PageConfig<typeof PAGE_TEMPLATE.custom> = {
      template: PAGE_TEMPLATE.custom,
    };

    return response(
      context.status(200),
      context.delay(DEFAULT_DELAY),
      context.json(fallbackPageConfig),
    );
  },
);

export { getPageConfig };
