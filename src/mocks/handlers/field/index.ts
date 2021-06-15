import { rest } from "msw";

import { DEFAULT_DELAY } from "mocks/constants";
import { getFieldsEndpoint, ENTITY_ID_QUERY_PARAMETER } from "services/field";

import { ENTITY_ID } from "../entity/constants";
import { Fields } from "./types";

const getFields = rest.get(getFieldsEndpoint, (request, response, context) => {
  const entityId = request.url.searchParams.get(ENTITY_ID_QUERY_PARAMETER);

  if (entityId === null) {
    return response(
      context.status(400),
      context.delay(DEFAULT_DELAY),
      context.json(`\`${ENTITY_ID_QUERY_PARAMETER}\` should be specified`),
    );
  }

  if (entityId === ENTITY_ID.posts) {
    const fields: Fields = [
      {
        name: "User Id",
        id: "userId",
        groups: ["posts", "default"],
      },
      {
        name: "Id",
        id: "id",
        groups: ["posts", "default"],
      },
      {
        name: "Title",
        id: "title",
        groups: ["posts", "default"],
      },
      {
        name: "Body",
        id: "body",
        groups: ["posts", "custom"],
      },
    ];

    return response(
      context.status(200),
      context.delay(DEFAULT_DELAY),
      context.json(fields),
    );
  }

  if (entityId === ENTITY_ID.users) {
    const fields: Fields = [
      {
        name: "Id",
        id: "id",
        groups: ["users", "default"],
      },
      {
        name: "Name",
        id: "name",
        groups: ["users", "default"],
      },
      {
        name: "Username",
        id: "username",
        groups: ["users", "default"],
      },
      {
        name: "Email",
        id: "email",
        groups: ["users", "default"],
      },
      {
        name: "Address",
        id: "address",
        groups: ["users", "default"],
      },
      {
        name: "Phone",
        id: "phone",
        groups: ["users", "default"],
      },
      {
        name: "Website",
        id: "website",
        groups: ["users", "default"],
      },
      {
        name: "Company",
        id: "company",
        groups: ["users", "custom"],
      },
    ];

    return response(
      context.status(200),
      context.delay(DEFAULT_DELAY),
      context.json(fields),
    );
  }

  if (entityId === ENTITY_ID.variables) {
    const fields: Fields = [];

    return response(
      context.status(200),
      context.delay(DEFAULT_DELAY),
      context.json(fields),
    );
  }

  return response(
    context.status(404),
    context.json(`Unknown \`${ENTITY_ID_QUERY_PARAMETER}\` value: ${entityId}`),
  );
});

export { getFields };
