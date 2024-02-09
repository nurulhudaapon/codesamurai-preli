import { TEST_CASES } from "./data.js";
import { describe, it } from "node:test";
import assert from "node:assert";

const HOST = "http://localhost:8000";

describe("API", () => {
  TEST_CASES.forEach((tc) => {
    it(tc.name, async () => {
      const response = await fetch(`${HOST}${tc.path}`, {
        method: tc.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: tc.body ? JSON.stringify(tc.body) : undefined,
      });

      assert.deepStrictEqual(await convertResponseToExpected(response), tc.expected);
    });
  });
});

async function convertResponseToExpected(response) {
  return {
    status: response.status,
    body: await response.json(),
  };
}
