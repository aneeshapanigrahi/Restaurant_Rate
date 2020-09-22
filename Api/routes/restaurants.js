const route = require("express").Router();
const Restaurant = require('../models/restaurant');
const userLogin = require("../middleware/userLogin");

route.get("/", userLogin, (req, res) => {
    Restaurant.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((err) => console.log(err));
});

route.get("/:_id", (req, res) => {
    Restaurant.findOne({ _id: req.params._id })
        .then((data) => {
            if (data === null) {
                res.json("no such restaurant");
            } else {
                res.json(data);
            }
        })
        .catch((err) => console.log(err));
});

module.exports = route;
