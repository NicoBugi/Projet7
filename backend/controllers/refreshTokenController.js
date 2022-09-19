
const jwt = require("jsonwebtoken")
const Users = require("../models/userModel.js")

exports.refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);
        const user = await Users.findAll({
            where: { refresh_token: refreshToken }
        });
        if (!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403);
            const userId = user[0].id;
            const nom = user[0].nom;
            const prenom = user[0].prenom;
            const userImg = user[0].userImg;
            const email = user[0].email;
            const role = user[0].role;
            const accessToken = jwt.sign({ userId, nom, prenom, userImg, email, role }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1h'
            });
            res.json({ accessToken });
        });
    } catch (error) {
        console.log(error);
    }
}