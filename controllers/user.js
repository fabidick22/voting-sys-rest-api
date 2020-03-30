'use strict';

const service = require("../services/jwt");
const User = require("../models/user");
const mongoose = require("mongoose");

function getUsers (req, res) {
    User.find({}, (err, users) => {
        if (err) res.status(500).send({message: "Error to get data"});
        if (!users) res.status(404).send({message: "Data not found!"});
        res.status(200).send(users);
    });
}

function getEmployees(req, res) {
    User.find({role: "employee"}, (err, employees) => {
        if (err) res.status(500).send({message: "Error to get data"});
        if (!employees) res.status(404).send({message: "Data not found!"});
        employees.forEach(element => {
            delete element._doc.password;
            delete element._doc.__v;
            delete element._doc.role;
        });
        res.status(200).send(employees);
    });
}

function getUserById(users){
    let userList = [];
    users.forEach(user => {
        userList.push(user._id);
        console.log(user._id)
    });
    console.log(userList)
    User.find().where('_id').in(userList).exec((err, records) => {
        return records;
    });
}

module.exports = {
    all: getUsers,
    many: getUserById,
    allEmployees: getEmployees
};
