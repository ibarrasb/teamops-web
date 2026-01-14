export type ApiErrorPayload = {
    message?: string;
    error?: string;
    status?: number;
    path?: string;
    timestamp?: string;
  };
  
  export class ApiError extends Error {
    status: number;
    payload?: ApiErrorPayload;
  
    constructor(message: string, status: number, payload?: ApiErrorPayload) {
      super(message);
      this.name = "ApiError";
      this.status = status;
      this.payload = payload;
    }
  }
  