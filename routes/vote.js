'use strict';

const votesV1 = require("express").Router();
const voteCtrl = require('../controllers/vote');
const authorization = require('../middlewares/auth');

// Votes EndPoint
votesV1.get("/", authorization(["admin"]), voteCtrl.all);
votesV1.post("/", authorization(["admin", "employee"]), voteCtrl.save);

module.exports = {
    v1: votesV1
};
