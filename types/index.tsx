export type LoginDataType = {
  email: string;
  password: string;
};

export type ErrorResponseType = {
  response?: {
    data: {
      message: string;
    };
    status: number;
  };
};

export const isErrorResponse = (error: unknown): error is ErrorResponseType => {
  const validError = error as ErrorResponseType;
  return validError?.response?.data?.message !== undefined && validError?.response?.status !== undefined;
};
