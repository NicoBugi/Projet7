/* Import des modules necessaires */
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config({ encoding: "latin1" });
const fs = require("fs");



/* Controleur inscription */
exports.signup = async (req, res, next) => {
    const { nom, prenom, email, password, confPassword } = req.body;
    if (password !== confPassword) return res.status(400).json({ msg: "Veuillez confirmer le mot de passe" });
    User.findOne({ email: req.body.email }, async function (err, emailExists) {
        if (!emailExists) {
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(password, salt);
            try {
                await User.create({
                    nom: nom,
                    prenom: prenom,
                    imageUrl: "./images/userImg/Capture.PNG1661607545026.png",
                    presentation: "ahahahhahah",
                    email: email,
                    password: hashPassword
                });
                res.json({ msg: "Inscription réussie" });
            } catch (error) {
                console.log(error);
            }
        } else {
            return res.status(400).json({ msg: "Cette adresse email existe déjà" });
        }
    });


};

exports.login = async (req, res, next) => {
    try {
        User.findOne({ email: req.body.email }, async function (err, user) {
            const match = await bcrypt.compare(req.body.password, user.password);
            if (!match) return res.status(400).json({ msg: "Mot de passe erroné" });
            const userId = user._id;
            const nom = user.nom;
            const prenom = user.prenom;
            const userImg = user.userImg;
            const email = user.email;
            const accessToken = jwt.sign({ userId, nom, prenom, userImg, email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1d'
            });
            const refreshToken = jwt.sign({ userId, nom, prenom, userImg, email }, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: '1d'
            });
            await User.updateOne({ refresh_token: refreshToken }, {
                where: {
                    id: userId
                }
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });
            res.json({ accessToken });
        });
    } catch (error) {
        res.status(404).json({ msg: "L'adresse email n'existe pas" });
    }
}


// /* Controleur modify */
// exports.modifyUser = async (req, res, next) => {
//     // Recup post avec id

//     User.findOne({ _id: req.params.userId })
//         .then(async (user) => {
//             // Enregistrement ancienne imgUrl (si nouvelle image dans modif)
//             const oldUrl = user.imageUrl;
//             const salt = await bcrypt.genSalt();
//             const hashPassword = await bcrypt.hash(req.body.password, salt);

//             if (req.file) {

//                 fs.unlink(`./images/userImg/${oldUrl}`, () => {

//                     const userObject = {
//                         presentation: req.body.presentation,
//                         email: req.body.email,
//                         password: hashPassword,
//                         nom: req.body.nom,
//                         prenom: req.body.prenom,
//                         imageUrl: req.file.filename,
//                     };
//                     console.log(userObject)
//                     // MAJ du user avec données modifiées
//                     User.updateOne({ _id: req.params.userId }, { ...userObject, _id: req.params.userId })
//                         .then(() => res.status(200).json({ message: 'User modifié !' }))
//                         .catch(error => res.status(400).json({ error }));
//                 });
//             } else {
//                 console.log(req.body)
//                 const newItem = req.body;
//                 newItem.imageUrl = oldUrl;

//                 // MAJ de la post avec données modifiées
//                 User.updateOne(
//                     { _id: req.params.userId },
//                     {
//                         presentation: req.body.presentation,
//                         email: req.body.email,
//                         password: hashPassword,
//                         nom: req.body.nom,
//                         prenom: req.body.prenom,
//                         imageUrl: oldUrl,
//                     }
//                 )
//                     .then(() => res.status(200).json({ message: "User mis à jour!" }))
//                     .catch((error) => res.status(400).json({ error }));
//             }
//         })
//         .catch((error) => res.status(500).json({ error }));
// };



/* Controleur modify */
exports.modifyUser = async (req, res, next) => {

    User.findOne({ _id: req.params.userId })
        .then(async (user) => {

            const oldUrl = user.imageUrl;
            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(req.body.password, salt);

            const UserObject = req.file ? {
                ...req.body,
                password: hashPassword,
                imageUrl: `${req.protocol}://${req.get('host')}/images/userImg/${req.file.filename}`
            } : { ...req.body, password: hashPassword, imageUrl: oldUrl };

            if (req.file) {

                let splitUrl = oldUrl.split("images/userImg/")[1];

                fs.unlink(`./images/userImg/${splitUrl}`, () => {

                    User.updateOne({ _id: req.params.userId }, { ...UserObject, _id: req.params.userId })
                        .then(() => res.status(200).json({ message: 'User modifié !' }))
                        .catch(error => res.status(400).json({ error }));
                })
            }
        })
        .catch((error) => res.status(500).json({ error }));
};