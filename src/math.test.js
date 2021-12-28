import doMath from "./math";

describe("Calculator tests", () => {
  test("adding 1 + 2 should return 3", () => {
    expect(doMath("1+3", "", "")).toBe(3);
  });
});
