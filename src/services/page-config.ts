import { Color } from "models/color/types";
import { Entity } from "models/entity/types";
import { Field } from "models/field/types";
import { PageConfig } from "models/page-config/types";
import { getEndpoint } from "utils/get-endpoint";

import { api } from "./api";

const getPageConfigEndpoint = getEndpoint(["page-config"]);

interface RequestParams {
  entity: Entity;
  field: Field;
  color: Color;
}

const getPageConfig = async (params: RequestParams): Promise<PageConfig> => {
  const { data } = await api.post<PageConfig>(getPageConfigEndpoint, params);

  return data;
};

export { getPageConfig, getPageConfigEndpoint };
