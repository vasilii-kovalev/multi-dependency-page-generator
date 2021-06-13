import { Entities } from "models/entity/types";
import { getEndpoint } from "utils/getEndpoint";

import { api } from "./api";

const getEntitiesEndpoint = getEndpoint(["entities"]);

const getEntities = async (): Promise<Entities> => {
  const { data } = await api.get<Entities>(getEntitiesEndpoint);

  return data;
};

export { getEntitiesEndpoint, getEntities };
