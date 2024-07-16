import "express";

declare global {
  namespace Express {
    interface Response {
      success<T>(data: T, statusCode?: number): this;
      error(
        code: number,
        message: string,
        details?: Record<string, unknown>,
      ): this;
    }
  }
}
