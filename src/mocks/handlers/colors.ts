import { rest } from "msw";

import { Colors } from "models/color/types";
import { getColorsEndpoint } from "services/color";

import { DEFAULT_DELAY } from "../constants";

const getColors = rest.get(getColorsEndpoint, (request, response, context) => {
  const colors: Colors = ["white", "black", "red", "green", "blue"];

  return response(
    context.status(200),
    context.delay(DEFAULT_DELAY),
    context.json(colors),
  );
});

export { getColors };
