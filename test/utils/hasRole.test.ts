import hasRole from "../../src/utils/hasRole";

test("Should return true", async () => {
  expect(hasRole(['ADMIN'], ['ADMIN', 'STANDARD'])).toBe(true);
});

test("Should return false", async () => {
  expect(hasRole(['TEST'], ['ADMIN', 'STANDARD'])).toBe(false);
});