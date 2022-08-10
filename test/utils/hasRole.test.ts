import hasRole from "../../src/utils/hasRole";

beforeAll(() => {
    process.env.RUNNING_TESTS = "";
});

test("Should return true", async () => {
    expect(hasRole(['ADMIN'], ['ADMIN', 'STANDARD'])).toBe(true);
});

test("Should return false", async () => {
    expect(hasRole(['TEST'], ['ADMIN', 'STANDARD'])).toBe(false);
});

afterAll(() => {
    process.env.RUNNING_TESTS = "true";
})