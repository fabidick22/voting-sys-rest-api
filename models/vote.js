'use strict';

//const mongoose = require('../config/db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User =  require("../models/user");
const Area = require('../models/area');

const VoteSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    vote: {
        type: Number,
        required: true,
        default: 1
    },
    comment: {
        type: String,
        default: ""
    },
    createDate: {
        type: Date,
        default: Date.now()
    }
});

VoteSchema.pre('save', function (next) {
    var self = this;
    User.find({username : self.user}, function (err, docs) {
        if (!docs.length){
            console.log('Username does not exist: ',self.name);
            next(new Error("Username does not exist!"));
        }else{
            next();
        }
    });
}) ;

VoteSchema.pre('save', function (next) {
    var self = this;
    Area.find({_id : self.area}, function (err, docs) {
        if (!docs.length){
            console.log('ID area does not exist: ',self.name);
            next(new Error("ID area  does not exist!"));
        }else{
            next();
        }
    });
}) ;

module.exports = mongoose.model('Vote', VoteSchema);
