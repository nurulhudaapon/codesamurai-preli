import { TEST_CASES } from "./data";
// const HOST = "http://localhost:8000"; // For local testing
const HOST = "http://host.docker.internal:8000"; // For devcontainer

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

      expect(await convertResponseToExpected(response)).toEqual(tc.expected);
    });
  });
});

async function convertResponseToExpected(response: Response) {
  return {
    status: response.status,
    body: await response.json(),
  };
}
