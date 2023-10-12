const users = require("../model/model")

const register = async (req, res) => {
    try {
        const user = await users.create(req.body)
        return res.status(200).send(user)
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

module.exports = { register }