'use strict';

const routes = require("express").Router();
const v1 = require("express").Router();
const authorization = require('../middlewares/auth');
const areas = require("./area");
const votes = require("./vote");
const user = require("./user");

// EndPoint list
// routes.use("/areas", authorization(["admin", "employee"]), areas.v1);
routes.use("/areas", authorization(["admin", "employee"]), areas.v1);
routes.use("/votes", authorization(["admin", "employee"]), votes.v1);
routes.use("/users", user.v1);

// Support multiple versions
v1.use("/api/v1", routes);

module.exports = v1;
