'use strict';

const Area = require("../models/area");

function saveArea(req, res) {
    let area = new Area();
    let data = req.body;

    area.name = data.name;
    area.description = data.description;

    area.save((err, areaSaved) => {
        if (err) res.status(500).send({message: `Error to save ${err}`});
        res.status(200).send({area: areaSaved})
    });
}

function getArea(id) {
    //pass
}

function getAreas(req, res) {
    Area.find({}, (err, areas) => {
        if (err) res.status(500).send({message: "Error to get data"});
        if (!areas) res.status(404).send({message: "Data not found!"});
        res.status(200).send(areas);
    });
}

function updateArea(id) {
    //pass
}

function deleteArea(id) {
    //pass
}

module.exports = {
    saveArea,
    getArea,
    getAreas
};
