process.env.NODE_ENV = "test";

const app = require("../app");
const request = require("supertest");
const sequelize = require("../config/database");
const { seedTestData } = require("./helpers");

module.exports = { app, request, seedTestData, sequelize };
