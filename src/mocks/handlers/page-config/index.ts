import { rest } from "msw";

import { DEFAULT_DELAY } from "mocks/constants";
import { PAGE_TEMPLATE } from "models/page-config/constants";
import {
  PageConfig,
  PageTemplateDefault,
  TemplateParams,
} from "models/page-config/types";
import { getPageConfigEndpoint } from "services/page-config";

import { ENTITY_ID } from "../entity/constants";
import { EntityRaw } from "../entity/types";
import { RequestBody } from "./types";

const defaultPageConfig: PageConfig<PageTemplateDefault> = {
  template: "default",
  params: [] as unknown as TemplateParams<PageTemplateDefault>,
};

const isValidEntity = (entity: EntityRaw | undefined): entity is EntityRaw =>
  Object.values(ENTITY_ID).includes(entity?.id as EntityRaw["id"]);

const getPageConfig = rest.post<RequestBody>(
  getPageConfigEndpoint,
  (request, response, context) => {
    console.log({ requestBody: request.body });
    const { entity } = request.body;

    if (!isValidEntity(entity)) {
      return response(
        context.status(400),
        context.delay(DEFAULT_DELAY),
        context.json(`Incorrect entity: ${entity}`),
      );
    }

    const { id: entityId } = entity;

    if (entityId === ENTITY_ID.users) {
      const pageConfig: PageConfig<typeof PAGE_TEMPLATE.usersDefault> = {
        template: "usersDefault",
        params: {
          urls: [
            "https://jsonplaceholder.typicode.com/",
            "https://pokeapi.co/",
          ],
        },
      };

      return response(
        context.status(200),
        context.delay(DEFAULT_DELAY),
        context.json(pageConfig),
      );
    }

    return response(
      context.status(200),
      context.delay(DEFAULT_DELAY),
      context.json(defaultPageConfig),
    );
  },
);

export { getPageConfig };
