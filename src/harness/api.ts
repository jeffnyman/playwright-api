import { APIRequestContext } from "@playwright/test";

export default class API {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  private async generateRequest(
    endpoint: string,
    method: string,
    requestBody?: object,
    token?: string,
  ) {
    const headers: Record<string, string> = token
      ? { Cookie: `token=${token}` }
      : {};

    const requestOptions = {
      headers,
      data: requestBody,
    };

    const response = await this.request[method](endpoint, requestOptions);
    return response;
  }

  async getRequest(endpoint: string) {
    return this.generateRequest(endpoint, "get");
  }

  async postRequest(endpoint: string, requestBody: object) {
    return this.generateRequest(endpoint, "post", requestBody);
  }

  async putRequest(endpoint: string, requestBody: object, token: string) {
    return this.generateRequest(endpoint, "put", requestBody, token);
  }

  async patchRequest(endpoint: string, requestBody: object, token: string) {
    return this.generateRequest(endpoint, "patch", requestBody, token);
  }

  async deleteRequest(endpoint: string, token: string) {
    return this.generateRequest(endpoint, "delete", undefined, token);
  }
}
