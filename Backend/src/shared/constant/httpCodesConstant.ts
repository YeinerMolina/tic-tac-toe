const success = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
};

const clientError = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
};

const serverError = {
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAIABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

const propertyes = {
  success,
  clientError,
  serverError,
};

export { propertyes as httpCodes };
