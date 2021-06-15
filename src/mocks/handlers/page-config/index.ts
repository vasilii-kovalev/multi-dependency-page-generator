import { rest } from "msw";

import { DEFAULT_DELAY } from "mocks/constants";
import { getPageConfigEndpoint } from "services/page-config";

import { PAGE_TEMPLATE } from "./constants";
import { PageConfig, RequestBody } from "./types";
import {
  handleEntityAndField,
  handleEntityFieldAndColor,
  handleEntityOnly,
  isColorValid,
  isEntityValid,
  isFieldValid,
} from "./utils";

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
    const handleEntityFieldAndColorResult = handleEntityFieldAndColor({
      response,
      context,
      entity,
      field,
      color,
    });

    if (handleEntityFieldAndColorResult !== null) {
      return handleEntityFieldAndColorResult;
    }

    const handleEntityAndFieldResult = handleEntityAndField({
      response,
      context,
      entity,
      field,
    });

    if (handleEntityAndFieldResult !== null) {
      return handleEntityAndFieldResult;
    }

    const handleEntityOnlyResult = handleEntityOnly({
      response,
      context,
      entity,
    });

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
