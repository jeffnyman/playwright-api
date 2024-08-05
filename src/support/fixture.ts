import { test as base } from "@playwright/test";
import api from "../harness/api";

type TestFixture = {
  API: api;
};

const fixtures = base.extend<TestFixture>({
  API: async ({ request }, use) => {
    const API = new api(request);
    await use(API);
  },
});

export { fixtures };
