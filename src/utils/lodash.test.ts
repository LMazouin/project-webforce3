import { has } from "./lodash";

describe("lodash functions", () => {
  describe("has", () => {
    const object = { a: { bar: 2 } };
    test("should return true", () => {
      const expected = true;
      const result = has(object, "a");
      expect(result).toBe(expected);
    });
  });
});
