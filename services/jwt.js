'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config.js');

function createToken(user) {
    const payload = {
        sub: user._id,
        role: user.role,
        username: user.username,
        iat: moment().unix(),
        exp: moment().add(config.get("security.jwtTokenExp"), 'hours').unix()
    };

    return jwt.encode(payload, config.get("security.jwtSecret"))
}

function decodeToken(token) {
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.get("security.jwtSecret"));
            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'The token has expired'
                })
            }
            resolve(payload)
        } catch (err) {
            reject({
                status: 500,
                message: 'Invalid Token'
            })
        }
    });

    return decoded
}

module.exports = {
    createToken,
    decodeToken
};
