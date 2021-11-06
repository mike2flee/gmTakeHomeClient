import { decimalFormat } from "./utils";

test("decimalFormat", () => {
  expect(decimalFormat(234.1345)).toBe("234.13");
});
