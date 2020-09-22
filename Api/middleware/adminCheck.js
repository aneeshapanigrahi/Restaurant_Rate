const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys');
const User = require('../models/user');

module.exports = (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ error: "you must be logged in" })
    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) throw err

        const { _id } = payload
        User.findById(_id).then(userdata => {
            if (userdata.admin === true) {
                next()
            }
            else {
                return res.json({ admin: userdata.admin, error: "Only admin allowed" })
            }
        })

    })
}