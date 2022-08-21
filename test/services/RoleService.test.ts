import RoleService from "../../src/services/RoleService";
import { closeDatabaseConnection, createDatabaseConnection } from "../../src/utils/database";

const roleService: RoleService = new RoleService();

beforeAll(async () => {
    await createDatabaseConnection();
})
test("Should create a valid Role", async () => {
    const newRole = await roleService.create(`TEST_ROLE`)
    expect(newRole.hasId()).toBe(true);
});

afterAll(async () => {
    await closeDatabaseConnection()
})