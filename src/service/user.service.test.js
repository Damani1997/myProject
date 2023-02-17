
const db = require('../models');
const mongoose = require('mongoose');
import config from "getconfig";
import { getAllUser ,addNewUser} from './user.service';

beforeAll(async () => {
  await mongoose.connect(config.mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});



describe("getAllUser function", () => {
  it("should return all users", async () => {
    const users = await getAllUser();
    expect(users).toBeDefined();
    expect(users).toBeInstanceOf(Array);
  });
});

describe("addNewUser", () => {
  it("should add a new user to the database", async () => {
    const name = "Joey";
    const password = "password";
    const email = "joeyyyy@test.com";

    const res = await addNewUser(name, password, email);
console.log(res)
    expect(res.name).toBe(name);
    expect(res.password).toBe(password);
    expect(res.email).toBe(email);
  });

});
jest.setTimeout(10000)