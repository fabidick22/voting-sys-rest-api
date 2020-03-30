'use strict';

const serviceJWT = require('../services/jwt');

function authorization(roles) {
    return (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(403).send({ message: 'Not authorized' })
        }

        const token = req.headers.authorization.split(' ').slice(-1)[0];

        serviceJWT.decodeToken(token).then(response => {
            req.user = response;
            if (!roles.includes(response.role)){
                return res.status(403).send({ message: 'You dont have enough permissions..' })
            }
            next()
        }).catch(response => {
            res.status(response.status)
        })
    };

}

module.exports = authorization;
