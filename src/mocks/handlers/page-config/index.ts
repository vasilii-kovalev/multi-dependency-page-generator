import { ResponseComposition, rest, RestContext } from "msw";

import { DEFAULT_DELAY } from "mocks/constants";
import { PAGE_TEMPLATE } from "models/page-config/constants";
import { PageConfig } from "models/page-config/types";
import { getPageConfigEndpoint } from "services/page-config";

import { COLOR_ID } from "../colors/constants";
import { ColorRaw } from "../colors/types";
import { ENTITY_ID } from "../entity/constants";
import { EntityRaw } from "../entity/types";
import { FIELD_ID } from "../field/constants";
import { FieldRaw } from "../field/types";
import { RequestBody } from "./types";

const isEntityValid = (entity: EntityRaw | undefined): entity is EntityRaw =>
  Object.values(ENTITY_ID).includes(entity?.id as EntityRaw["id"]);

const isFieldValid = (field: FieldRaw | undefined): field is FieldRaw =>
  Object.values(FIELD_ID).includes(field?.id as FieldRaw["id"]);

const isColorValid = (color: ColorRaw | undefined): color is ColorRaw =>
  Object.values(COLOR_ID).includes(color?.id as ColorRaw["id"]);

const handleEntityFieldAndColor = (
  response: ResponseComposition,
  context: RestContext,
  entity: EntityRaw,
  field: FieldRaw | undefined,
  color: ColorRaw | undefined,
) => {
  if (field !== undefined && color !== undefined) {
    const { id: entityId } = entity;
    const { id: fieldId } = field;
    const { id: colorId } = color;

    if (
      entityId === ENTITY_ID.users &&
      fieldId === FIELD_ID.company &&
      colorId === COLOR_ID.blue
    ) {
      const pageConfig: PageConfig<typeof PAGE_TEMPLATE.colorPicker> = {
        template: PAGE_TEMPLATE.colorPicker,
        params: {
          color: "#0000ff",
        },
      };

      return response(
        context.status(200),
        context.delay(DEFAULT_DELAY),
        context.json(pageConfig),
      );
    }
  }

  return null;
};

const handleEntityAndField = (
  response: ResponseComposition,
  context: RestContext,
  entity: EntityRaw,
  field: FieldRaw | undefined,
) => {
  if (field !== undefined) {
    const { id: entityId } = entity;
    const { id: fieldId } = field;

    if (entityId === ENTITY_ID.posts && fieldId === FIELD_ID.body) {
      const pageConfig: PageConfig<typeof PAGE_TEMPLATE.link> = {
        template: PAGE_TEMPLATE.link,
        params: {
          images: [
            {
              url: "https://i.imgur.com/NjcarfN.jpeg",
              description: "Woman yelling at a cat - Star Wars version",
            },
            {
              url: "https://pbs.twimg.com/media/ErTXkrEWMAQ6GJo.jpg",
              description: "Software development joke",
            },
          ],
          link: {
            url: "https://whocanuse.com/",
            text: "WhoCanUse",
          },
        },
      };

      return response(
        context.status(200),
        context.delay(DEFAULT_DELAY),
        context.json(pageConfig),
      );
    }
  }

  return null;
};

const handleEntityOnly = (
  response: ResponseComposition,
  context: RestContext,
  entity: EntityRaw,
) => {
  const { id: entityId } = entity;

  if (entityId === ENTITY_ID.posts) {
    const pageConfig: PageConfig<typeof PAGE_TEMPLATE.default> = {
      template: PAGE_TEMPLATE.default,
      params: {
        tables: [],
      },
    };

    return response(
      context.status(200),
      context.delay(DEFAULT_DELAY),
      context.json(pageConfig),
    );
  }

  if (entityId === ENTITY_ID.users) {
    const pageConfig: PageConfig<typeof PAGE_TEMPLATE.usersDefault> = {
      template: PAGE_TEMPLATE.usersDefault,
      params: {
        image: {
          url: "https://telegra.ph/file/c1bde7af4a7c021fc5d87.jpg",
          description: "A suffering cat",
        },
        links: [
          {
            url: "https://jsonplaceholder.typicode.com/",
            text: "JSONPlaceholder",
          },
          { url: "https://pokeapi.co/", text: "PokéAPI" },
        ],
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

const getPageConfig = rest.post<RequestBody>(
  getPageConfigEndpoint,
  (request, response, context) => {
    const { entity, field, color } = request.body;

    if (!isEntityValid(entity)) {
      return response(
        context.status(400),
        context.delay(DEFAULT_DELAY),
        context.json(`Incorrect entity: ${entity}`),
      );
    }

    if (field !== undefined && !isFieldValid(field)) {
      return response(
        context.status(400),
        context.delay(DEFAULT_DELAY),
        context.json(`Incorrect field: ${field}`),
      );
    }

    if (color !== undefined && !isColorValid(color)) {
      return response(
        context.status(400),
        context.delay(DEFAULT_DELAY),
        context.json(`Incorrect color: ${color}`),
      );
    }

    // More specific first, less specific last.
    const handleEntityFieldAndColorResult = handleEntityFieldAndColor(
      response,
      context,
      entity,
      field,
      color,
    );

    if (handleEntityFieldAndColorResult !== null) {
      return handleEntityFieldAndColorResult;
    }

    const handleEntityAndFieldResult = handleEntityAndField(
      response,
      context,
      entity,
      field,
    );

    if (handleEntityAndFieldResult !== null) {
      return handleEntityAndFieldResult;
    }

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
