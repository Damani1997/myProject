const {userService} = require("../service/user.service.js");

describe("getAllUser function", () => {
  it("should return all users", async () => {
    const users = await userService.getAllUser();
    expect(users).toBeDefined();
    expect(users).toBeInstanceOf(Array);
  });
});
jest.setTimeout(60000)