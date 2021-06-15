import { EntityId } from "models/entity/types";
import { Fields } from "models/field/types";
import { getEndpoint } from "utils/get-endpoint";

import { api } from "./api";

const getFieldsEndpoint = getEndpoint(["fields"]);

const ENTITY_ID_QUERY_PARAMETER = "entityId";

interface QueryParameters {
  [ENTITY_ID_QUERY_PARAMETER]: EntityId;
}

const getFields = async (entityId: EntityId): Promise<Fields> => {
  const query: QueryParameters = {
    [ENTITY_ID_QUERY_PARAMETER]: entityId,
  };

  const { data } = await api.get<Fields>(getFieldsEndpoint, { params: query });

  return data;
};

export { ENTITY_ID_QUERY_PARAMETER, getFields, getFieldsEndpoint };
