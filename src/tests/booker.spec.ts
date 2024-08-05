import { expect } from "@playwright/test";
import { fixtures as test } from "../support/fixture";

test.describe("Booker Tests", () => {
  let token: string;
  let bookingId: string;

  test.beforeAll(async ({ API }) => {
    const response = await API.postRequest("/auth", {
      username: "admin",
      password: "password123",
    });

    token = (await response.json()).token;
  });

  test("list of bookings can be retrieved", async ({ API }) => {
    const response = await API.getRequest("/booking");

    expect.soft(response.status()).toBe(200);
    expect((await response.json())[0]).toHaveProperty("bookingid");
  });

  test.describe("create a booking", async () => {
    test.beforeAll(async ({ API }) => {
      const response = await API.postRequest("/booking", {
        firstname: "Jeff",
        lastname: "Nyman",
        totalprice: 250,
        depositpaid: true,
        bookingdates: {
          checkin: "2024-11-01",
          checkout: "2024-11-08",
        },
        additionalneeds: "excessive pampering",
      });

      bookingId = (await response.json()).bookingid;
    });

    test("existing bookings can be updated", async ({ API }) => {
      const response = await API.putRequest(
        `/booking/${bookingId}`,
        {
          firstname: "Jeffrey",
          lastname: "Nyman",
          totalprice: 100,
          depositpaid: true,
          bookingdates: {
            checkin: "2024-11-01",
            checkout: "2024-11-08",
          },
          additionalneeds: "excessive pampering",
        },
        token,
      );

      expect.soft(response.status()).toBe(200);
      expect((await response.json()).firstname).toBe("Jeffrey");
      expect((await response.json()).totalprice).toBe(100);
    });

    test("existing booking can be partially updated", async ({ API }) => {
      const response = await API.patchRequest(
        `/booking/${bookingId}`,
        {
          firstname: "Jefficus",
          lastname: "Nymanus",
        },
        token,
      );

      expect.soft(response.status()).toBe(200);
      expect((await response.json()).firstname).toBe("Jefficus");
      expect((await response.json()).lastname).toBe("Nymanus");
    });

    test("existing booking can be deleted", async ({ API }) => {
      //
      const response = await API.deleteRequest(`/booking/${bookingId}`, token);
      expect.soft(response.status()).toBe(201);
    });
  });
});
