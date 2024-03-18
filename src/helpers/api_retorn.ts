export enum ApiErrors {
  INVALID_TOKEN = 'Invalid token',
  INVALID_FILTER = 'Invalid filter',
  INVALID_QUERY = 'Invalid query',
  INVALID_BODY = 'Invalid body',
  INVALID_REQUEST = 'Invalid request',
  INVALID_DATA = 'Invalid data',
}

export enum returnStatus {
  Success = 200,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500
}


