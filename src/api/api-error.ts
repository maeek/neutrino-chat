export class ChatApiError extends Error {
  type: string;
  base: any;
  data: any;

  constructor(
    message: string,
    data: { error: any; [key: string]: any },
    type = 'Api.generic'
  ) {
    super(message);

    this.base = data.error;
    this.data = {
      ...data,
      error: undefined
    };
    this.type = type;
  }
}
