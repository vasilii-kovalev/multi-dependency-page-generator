import { Entity } from "models/entity/types";
import { Fields } from "models/field/types";
import { getEndpoint } from "utils/getEndpoint";

import { api } from "./api";

const getFieldsEndpoint = getEndpoint(["fields"]);

const getFields = async (entity: Entity): Promise<Fields> => {
  const { data } = await api.get<Fields>(getFieldsEndpoint, {
    params: { entity },
  });

  return data;
};

export { getFieldsEndpoint, getFields };
