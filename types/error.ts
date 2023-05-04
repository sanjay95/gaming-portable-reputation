export type ErrorResponse = {
  code: string
  message?: string
  issues?: { message: string }[],
  response?: {
    data?: {
      error?: {
        code?: string
      }
    }
  }
}

export enum ErrorCodes {
  SCAN_ERROR = 'SCAN_ERROR',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_OTP_CODE = 'INVALID_OTP_CODE',
  HTTP_METHOD_NOT_ALLOWED = 'HTTP_METHOD_NOT_ALLOWED',
  CLOUD_WALLET_NOT_AUTHENTICATED = 'CLOUD_WALLET_NOT_AUTHENTICATED',
  JWT_EXPIRED_ERROR = 'JWT_EXPIRED_ERROR',
}
