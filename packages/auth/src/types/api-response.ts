export interface ApiResponse<T> {
  status: "success" | "error";
  data: T | null;
  error: ApiError | null;
}

export interface ApiError {
  code: number;
  message: string;
  details?: any;
}
