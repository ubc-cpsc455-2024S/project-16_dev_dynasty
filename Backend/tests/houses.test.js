const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const House = require("../models/House");
const houseData = require("../data/houses.json");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_TEST_URI);
  await House.deleteMany({});
  await House.insertMany(houseData);
});

/* Test get all houses. */
describe("GET /houses", () => {
  it("should get all the houses", async () => {
    //   const token = await request(app).post("/api/auth/login").send({
    //     email: process.env.EMAIL,
    //     password: process.env.PASSWORD,
    //   });

    const response = await request(app).get("/houses");

    expect(response.statusCode).toBe(200);
    expect(response.body.result.length).toBe(2);
  });
});

/* Test get all houses in bay. */
describe("GET /houses/inbay", () => {
  it("should get all the houses currently in bay", async () => {
    //   const token = await request(app).post("/api/auth/login").send({
    //     email: process.env.EMAIL,
    //     password: process.env.PASSWORD,
    //   });

    const response = await request(app).get("/houses/inbay");

    expect(response.statusCode).toBe(200);
    expect(response.body.result.length).toBe(1);
    expect(response.body.result[0].bay_id).toEqual("15");
    expect(response.body.result[0].bay_description).toEqual(
      "description for bay 15",
    );
  });
});

/* Test post a house. */
describe("POST /houses", () => {
  it("should add a house to database", async () => {
    //   const token = await request(app).post("/api/auth/login").send({
    //     email: process.env.EMAIL,
    //     password: process.env.PASSWORD,
    //   });

    const newHouse1 = {
      npl: "1500",
      house_model: "023-001",
      square_ft: 1600,
    };

    const response = await request(app)
      .post("/houses")
      .send(newHouse1)
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(201);
    expect(response.body.result).toHaveProperty("_id");
    expect(response.body.result.npl).toBe(newHouse1.npl);
    expect(response.body.result.house_model).toBe(newHouse1.house_model);
    expect(response.body.result.square_ft).toBe(newHouse1.square_ft);
    expect(response.body.result.bay_id).toEqual(null);
    expect(response.body.result.bay_name).toEqual(null);
    expect(response.body.result.customer_id).toEqual(null);
    expect(response.body.result.house_records_id).toEqual(null);

    const houseInDb = await House.findById(response.body.result._id);
    expect(houseInDb).not.toBeNull();
    expect(houseInDb.npl).toBe(newHouse1.npl);
    const count = await House.countDocuments();
    expect(count).toBe(3);

    const newHouse2 = {
      npl: "1453",
      online_date: "18-Jan-24",
      created_on: "17-Jan-24",
      house_model: "023-002",
      square_ft: 999,
      bay_id: "15",
      bay_name: "Bay 15",
      status: 2,
    };

    const response2 = await request(app)
      .post("/houses")
      .send(newHouse2)
      .set("Accept", "application/json");
    expect(response2.statusCode).toBe(201);
    expect(response2.body.result).toHaveProperty("_id");
    expect(response2.body.result.npl).toBe(newHouse2.npl);
    expect(response2.body.result.house_model).toBe(newHouse2.house_model);
    expect(response2.body.result.square_ft).toBe(newHouse2.square_ft);
    expect(response2.body.result.bay_id).toEqual(newHouse2.bay_id);
    expect(response2.body.result.bay_name).toEqual(newHouse2.bay_name);
    expect(response2.body.result.customer_id).toEqual(null);
    expect(response2.body.result.house_records_id).toEqual(null);

    const houseInDb2 = await House.findById(response2.body.result._id);
    expect(houseInDb2).not.toBeNull();
    expect(houseInDb2.npl).toBe(newHouse2.npl);
    const count2 = await House.countDocuments();
    expect(count2).toBe(4);
  });
});

/* Test delete a house. */
describe("DELETE /houses/:houseid", () => {
  it("should delete the specific house", async () => {
    //   const token = await request(app).post("/api/auth/login").send({
    //     email: process.env.EMAIL,
    //     password: process.env.PASSWORD,
    //   });

    const houseFound = await House.findOne({ npl: "1455" });
    const houseId = houseFound._id;

    const response = await request(app).delete(`/houses/${houseId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.result.houseDeleted._id).toEqual(houseId.toString());
    const count = await House.countDocuments();
    expect(count).toBe(1);
  });
});

/* Test update a house. */
describe("PUT /houses/:houseid", () => {
  it("should update the house data", async () => {
    //   const token = await request(app).post("/api/auth/login").send({
    //     email: process.env.EMAIL,
    //     password: process.env.PASSWORD,
    //   });

    const houseFound = await House.findOne({ npl: "1455" });
    const houseId = houseFound._id;
    const newData = {
      npl: "1455",
      created_on: "17-Jan-24",
      house_model: "023",
      square_ft: 2999,
    };

    const response = await request(app)
      .put(`/houses/${houseId}`)
      .send(newData)
      .set("Accept", "application/json");

    expect(response.statusCode).toBe(200);
    expect(response.body.result._id).toEqual(houseId.toString());
    expect(response.body.result.npl).toBe(newData.npl);
    expect(response.body.result.house_model).toBe(newData.house_model);
    expect(response.body.result.square_ft).toBe(newData.square_ft);
    expect(response.body.result.customer_id).toEqual(null);
    expect(response.body.result.customer_email).toBeNull;
    expect(response.body.result.bay_description).toBeNull;
    expect(response.body.result.house_records_id).toEqual(null);
  });
});

/* Test update a house bay. */
describe("PATCH /houses/:houseid/:bayid", () => {
  it("should update the specific house to the specific bay", async () => {
    //   const token = await request(app).post("/api/auth/login").send({
    //     email: process.env.EMAIL,
    //     password: process.env.PASSWORD,
    //   });

    const houseFound = await House.findOne({ npl: "1455" });
    const houseId = houseFound._id;

    const response = await request(app).patch(`/houses/${houseId}/1`);

    expect(response.statusCode).toBe(200);
    //
    console.log(response.body);
    expect(response.body.result._id).toEqual(houseId.toString());

    expect(response.body.result.bay_id).toEqual("1");
    const updatedHouse = await House.findById(houseId);
    expect(updatedHouse.status).toBe(1);

    const response2 = await request(app).patch(`/houses/${houseId}/15`);

    expect(response2.statusCode).toBe(400);
    expect(response2.body.bayInUseError).toEqual(
      "Bay in use: 15 is already assigned to another house.",
    );
  });
});

/* Closing database connection after each test. */
afterEach(async () => {
  await House.deleteMany({});
  await mongoose.connection.close();
});
