const route = require("express").Router();
const SuggestedR = require('../models/suggestedRestaurant');
const Restaurant = require('../models/restaurant');
const adminCheck = require("../middleware/adminCheck");
const userLogin = require("../middleware/userLogin");

route.get("/", adminCheck, (req, res) => {
    Restaurant.find({})
        .then((data) => {
            res.json({ message: "Welcome admin", data });
        })
        .catch((err) => console.log(err));
});

route.post('/add', adminCheck, (req, res) => {
    const { name, description, rating, address, pic, timings, contactNo, website, comments } = req.body
    if (!name || !description || !rating || !address || !pic || !timings || !contactNo || !website || !comments)
        return res.status(422).json("Please fill all credentials")
    Restaurant.findOne({ name: name })
        .then((data) => {
            if (data) {
                return res.status(409).json({ error: "Restaurant already exists" })
            }
            let restaurant = new Restaurant({
                pic,
                name,
                description,
                rating,
                timings,
                address,
                contactNo,
                website,
                comments,
            })
            restaurant.save()
                .then((data) => {
                    res.json({ message: "saved the restaurant", data: data })

                }).catch((err) => {
                    console.log(err)
                })
        })
        .catch((err) => {
            console.log(err);
        })
});

route.post('/suggestion', userLogin, (req, res) => {
    const { name, description, rating, address } = req.body
    if (!name || !description || !rating || !address)
        return res.status(422).json("Please fill all credentials")
    SuggestedR.findOne({ name: name })
        .then((data) => {
            if (data) {
                return res.status(409).json({ error: "Restaurant already exists" })
            }
            let restaurant = new SuggestedR({
                pic,
                name,
                description,
                rating,
                timings,
                address,
                contactNo,
                website,
                comments,
            })
            restaurant.save()
                .then((data) => {
                    res.json({ message: "saved the restaurant", data: data })

                }).catch((err) => {
                    console.log(err)
                })
        })
        .catch((err) => {
            console.log(err);
        })
});

module.exports = route;