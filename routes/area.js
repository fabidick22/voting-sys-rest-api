'use strict';

const areasV1 = require("express").Router();
const areaCtrl = require('../controllers/area');

// Area EndPoint
areasV1.get("/", areaCtrl.getAreas);
areasV1.post("/", areaCtrl.saveArea);

module.exports = {
    v1: areasV1
};
