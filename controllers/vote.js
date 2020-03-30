'use strict';

const Vote = require("../models/vote");
const User = require("../models/user");
const moment = require("moment");

function saveVote(req, res) {
    let vote = new Vote();

    vote.user = req.body.user;
    vote.area = req.body.area;
    vote.comment = req.body.comment;
    vote.createDate = req.body.createDate;
    if (req.user.username === req.body.user){
        res.status(400).send({type: "warning", message: "You can't self-assign yourself a vote"});
        return;
    }
    vote.save((err, voteSaved) => {
        if (err) res.status(500).send({message: `Error to save ${err}`});
        res.status(200).send({vote: voteSaved})
    });

}

function getVote(id) {
    //pass
}

function getUserById(id) {
    return User.findById(id).exec(function (err, doc) {
        return doc
    });
}

function getVotes(req, res) {
    let queryData = req.query;
    if (Object.entries(queryData).length  !== 0){
        let cat = req.query.category;
        let startData = moment().startOf('month');
        let endData = moment().endOf('month');
        if (cat === "employee"){
            Vote.aggregate([{
                $group : {
                    _id : "$user",
                    total : {
                        $sum : "$vote"
                    }
                }
            },{
                $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "username",
                as: "userData"
        }
        }],(err, doc) => {
                res.status(200).send(doc);
            });
        } else if (cat === "area"){
            Vote.aggregate([{
                $group : {
                    _id : "$area",
                    total : {
                        $sum : "$vote"
                    }
                }
            }],(err, doc) => {
                res.status(200).send(doc);
            });
        } else {
            res.status(400).send({message: "Not supported!"});
        }

    } else {
        Vote.find({}, (err, votes) => {
            if (err) res.status(500).send({message: "Error to get data"});
            if (!votes) res.status(404).send({message: "Data not found!"});
            //res.status(200).send(votes)
            res.send(votes)
        });
    }
}

function updateVote(id) {
    //pass
}

function deleteVote(id) {
    //pass
}

module.exports = {
    save: saveVote,
    one: getVote,
    all: getVotes
};
