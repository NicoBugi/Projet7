/* Import des modules necessaires */
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const ModelPost = require("./postModel.js");

/* Schema User */
const ModelUser = mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    presentation: { type: String, required: true },
    imageUrl: { type: String, required: true },
});

/* Verification email unique */
ModelUser.plugin(uniqueValidator);

module.exports = mongoose.model("User", ModelUser);
