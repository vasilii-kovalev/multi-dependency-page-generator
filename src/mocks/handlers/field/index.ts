import { rest } from "msw";

import { DEFAULT_DELAY } from "mocks/constants";
import { getFieldsEndpoint, ENTITY_ID_QUERY_PARAMETER } from "services/field";

import { handleEntityId } from "./utils";

const getFields = rest.get(getFieldsEndpoint, (request, response, context) => {
  const entityId = request.url.searchParams.get(ENTITY_ID_QUERY_PARAMETER);

  if (entityId === null) {
    return response(
      context.status(400),
      context.delay(DEFAULT_DELAY),
      context.json(`\`${ENTITY_ID_QUERY_PARAMETER}\` should be specified`),
    );
  }

  const handleEntityIdResult = handleEntityId({ context, response, entityId });

  if (handleEntityIdResult !== null) {
    return handleEntityIdResult;
  }

  return response(
    context.status(404),
    context.json(`Unknown \`${ENTITY_ID_QUERY_PARAMETER}\` value: ${entityId}`),
  );
});

export { getFields };
