import { rest } from "msw";

import { DEFAULT_DELAY } from "mocks/constants";
import { getPageConfigEndpoint } from "services/page-config";

import { RequestBody } from "./types";
import { ENTITY_ID } from "../entity/constants";
import { FIELD_ID } from "../field/constants";
import { COLOR_ID } from "../colors/constants";
import {
  PageConfig,
  PageTemplateDefault,
  TemplateParams,
} from "models/page-config/types";

const getPageConfig = rest.post<RequestBody>(
  getPageConfigEndpoint,
  (request, response, context) => {
    const { entity, field, color } = request.body;
    console.log({ requestBody: request.body });

    const isValidEntity = Object.values(ENTITY_ID).includes(entity.id);
    const isValidField = Object.values(FIELD_ID).includes(field.id);
    const isValidColor = Object.values(COLOR_ID).includes(color.id);
    const isDataValid = [isValidEntity, isValidField, isValidColor].every(
      Boolean,
    );

    if (!isDataValid) {
      return response(
        context.status(400),
        context.delay(DEFAULT_DELAY),
        context.json("Incorrect input data"),
      );
    }

    const defaultPageConfig: PageConfig<PageTemplateDefault> = {
      template: "default",
      params: [] as unknown as TemplateParams<PageTemplateDefault>,
    };

    return response(
      context.status(200),
      context.delay(DEFAULT_DELAY),
      context.json(defaultPageConfig),
    );
  },
);

export { getPageConfig };
