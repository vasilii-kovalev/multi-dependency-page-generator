import { rest } from "msw";

import { DEFAULT_DELAY } from "mocks/constants";
import { getColorsEndpoint } from "services/color";

import { Colors } from "./types";

const getColors = rest.get(getColorsEndpoint, (request, response, context) => {
  const colors: Colors = [
    {
      name: "White",
      id: "white",
      groups: ["default"],
    },
    {
      name: "Black",
      id: "black",
      groups: ["default"],
    },
    {
      name: "Red",
      id: "red",
      groups: ["default"],
    },
    {
      name: "Green",
      id: "green",
      groups: ["default"],
    },
    {
      name: "Blue",
      id: "blue",
      groups: ["custom"],
    },
  ];

  return response(
    context.status(200),
    context.delay(DEFAULT_DELAY),
    context.json(colors),
  );
});

export { getColors };
