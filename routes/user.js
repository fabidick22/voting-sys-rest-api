'use strict';

const usersV1 = require("express").Router();
const userCtrl = require('../controllers/user');
const authCtrl = require('../controllers/auth');
const authorization = require('../middlewares/auth');

// User EndPoint
usersV1.get("/", authorization(["admin", "employee"]), userCtrl.all);
usersV1.get("/employees", authorization(["admin"]), userCtrl.allEmployees);
usersV1.post("/signUp", authCtrl.signUp);
usersV1.post("/signIn", authCtrl.signIn);

module.exports = {
    v1: usersV1
};
