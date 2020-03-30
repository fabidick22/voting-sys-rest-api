'use strict';

const mongoose = require('../config/db');
const Schema = mongoose.Schema;

const AreaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Area', AreaSchema);
