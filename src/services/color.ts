import { Colors } from "models/color/types";
import { getEndpoint } from "utils/get-endpoint";

import { api } from "./api";

const getColorsEndpoint = getEndpoint(["colors"]);

const getColors = async (): Promise<Colors> => {
  const { data } = await api.get<Colors>(getColorsEndpoint);

  return data;
};

export { getColors, getColorsEndpoint };
