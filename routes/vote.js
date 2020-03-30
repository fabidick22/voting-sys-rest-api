'use strict';

const votesV1 = require("express").Router();
const voteCtrl = require('../controllers/vote');

// Votes EndPoint
votesV1.get("/", voteCtrl.all);
votesV1.post("/", voteCtrl.save);

module.exports = {
    v1: votesV1
};
