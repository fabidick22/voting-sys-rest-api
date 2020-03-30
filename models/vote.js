'use strict';

//const mongoose = require('../config/db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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

module.exports = mongoose.model('Vote', VoteSchema);
