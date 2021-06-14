const BASE_URL = "/api/";

type EndpointPart = string | number;

const getEndpoint = (endpointParts: EndpointPart[]) => {
  const joinedEndpointParts = endpointParts.join("/");

  return `${BASE_URL}${joinedEndpointParts}`;
};

export { getEndpoint };
