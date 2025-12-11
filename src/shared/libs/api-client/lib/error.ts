import type { BaseResponse } from '../rules/types';

export class BaseResponseError extends Error {
  public errorMessage: string;
  public code: number;
  public status: string;

  constructor(option: BaseResponse<unknown>) {
    const fallbackErrorMessage =
      `<< Response Error - HTTP ${option.code} >>\n` +
      `   (Status: ${option.status}) ${option.error}`;

    super(fallbackErrorMessage);

    this.code = option.code;
    this.status = option.status;
    this.errorMessage = option.error;
  }
}

export class AdapterError extends Error {
  errors: string[];

  constructor(errors: string[]) {
    const errorMessages = errors.map((error) => `- ${error}`);
    const fallbackErrorMessage =
      '<< Adapter Error >>\n' + errorMessages.join('\n');

    super(fallbackErrorMessage);

    this.errors = errors;
  }

  getErrors(): string[] {
    return this.errors;
  }
}
