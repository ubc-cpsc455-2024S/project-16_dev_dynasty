const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const Bay = require("../models/Bay");

require("dotenv").config();
const bayData = require("../data/bays.json");

/* Connecting to the database before each test. */
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_TEST_URI);
});

/* Test get all bays. */
describe("GET /bays", () => {
  it("should get all the bays", async () => {
    const bayResponse = await request(app).get("/bays");

    expect(bayResponse.statusCode).toBe(200);
    expect(bayResponse.body.result.length).toBe(30);
    expect(bayResponse.body.result).toEqual(
      expect.arrayContaining(
        bayData.map((bayData) => expect.objectContaining(bayData)),
      ),
    );
  });
});

/* Test get specific bay. */
describe("GET /bays/20", () => {
  it("should get all the bays", async () => {
    const bayResponse = await request(app).get("/bays/20");

    expect(bayResponse.statusCode).toBe(200);
    expect(bayResponse.body.result.bay_id).toEqual("20");
    expect(bayResponse.body.result.bay_name).toEqual("Bay 20");
  });
});

/* Closing database connection after each test. */
afterAll(async () => {
  // await Bay.deleteMany({});
  await mongoose.connection.close();
});
