const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const House = require('../models/House');
const houseData = require('../data/houses.json');


require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_TEST_URI);
    await House.deleteMany({});
    await House.insertMany(houseData);
  });

  describe("GET /houses", () => {
    it("should get all the houses", async () => {
    //   const token = await request(app).post("/api/auth/login").send({
    //     email: process.env.EMAIL,
    //     password: process.env.PASSWORD,
    //   });
  
      const response = await request(app)
        .get("/houses");
  
      expect(response.statusCode).toBe(200);
      expect(response.body.result.length).toBe(2);
    });
  });


  describe("GET /houses/inbay", () => {
    it("should get all the houses currently in bay", async () => {
    //   const token = await request(app).post("/api/auth/login").send({
    //     email: process.env.EMAIL,
    //     password: process.env.PASSWORD,
    //   });
  
      const response = await request(app)
        .get("/houses/inbay");
  
      expect(response.statusCode).toBe(200);
      expect(response.body.result.length).toBe(1);
      expect(response.body.result[0].bay_id).toEqual('15');
      expect(response.body.result[0].bay_description).toEqual('description for bay 15');
    });
  });
  
  /* Closing database connection after each test. */
  afterEach(async () => {
    await House.deleteMany({});
    await mongoose.connection.close();
  });