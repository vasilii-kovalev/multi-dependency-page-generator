import { rest } from "msw";

import { ENTITY } from "models/entity/constants";
import { Fields } from "models/field/types";
import { Post } from "models/post/types";
import { User } from "models/user/types";
import { getFieldsEndpoint } from "services/field";

import { DEFAULT_DELAY } from "../constants";

const getFields = rest.get(getFieldsEndpoint, (request, response, context) => {
  const entity = request.url.searchParams.get("entity");

  if (entity === null) {
    return response(
      context.status(400),
      context.delay(DEFAULT_DELAY),
      context.json("`entity` query should be specified"),
    );
  }

  if (entity === ENTITY.posts) {
    const fields: Fields<Post> = ["userId", "id", "title", "body"];

    return response(
      context.status(200),
      context.delay(DEFAULT_DELAY),
      context.json(fields),
    );
  }

  if (entity === ENTITY.users) {
    const fields: Fields<User> = [
      "id",
      "name",
      "username",
      "email",
      "address",
      "phone",
      "website",
      "company",
    ];

    return response(
      context.status(200),
      context.delay(DEFAULT_DELAY),
      context.json(fields),
    );
  }

  return response(
    context.status(404),
    context.json(`Unknown \`entity\` query value: ${entity}`),
  );
});

export { getFields };
