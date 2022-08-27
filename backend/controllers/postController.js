/* Import des modules necessaires */
const Post = require("../models/postModel");
const Users = require("../models/userModel");
const fs = require("fs");


/* Controleur creation post */
exports.createPost = async (req, res, next) => {
    try {
        const userId = req.body.userId;

        const post = req.file ?
            {
                ...req.body,
                userId: userId,
                imageUrl: req.file.filename,

                // Initialisation valeur like-dislike 0
                likes: 0,
                dislikes: 0,
                usersLiked: [],
                usersDisliked: [],
            } : {
                ...req.body,
                userId: userId,
            };
        await Post.create(post);
        res.json({ msg: "Publication réussie" });
    } catch (error) {
        res.json({ msg: error.msg });
    }
};

/* Controleur recuperation all posts */
exports.getAllPost = (req, res, next) => {
    Post.find()
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((error) => {
            res.status(400).json({
                error: error,
            });
        });
};

/* Controleur recuperation 1 post */
exports.getOnePost = async (req, res, next) => {
    // Recup post avec id
    const post = await Post.findOne({
        where: { id: req.params.id },
    });

    const user = await Users.findOne({
        where: { id: post.userId },
    });

    let PostCompiled = {
        post: post,
        user: user,
    }

    res.send(PostCompiled);
};


/* Controleur suppression post */
exports.deletePost = (req, res, next) => {
    // Recup post avec id
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            // Empêcher n'importe qu'elle utilisateur de delete une post
            if (!post) {
                res.status(404).json({
                    error: new Error('No such Post!')
                });
            }
            // Extraction du nom du fichier à supprimer
            const filename = post.imageUrl.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
                // Suppression post
                Post.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: "Post supprimé !" }))
                    .catch((error) => res.status(400).json({ error }));
            });
        })
        .catch((error) => res.status(500).json({ error }));
};

// text: req.body.text,
// userId: req.body.userId,
/* Controleur modification post */
exports.modifyPost = (req, res, next) => {
    // Recup post avec id
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            // Enregistrement ancienne imgUrl (si nouvelle image dans modif)
            const oldUrl = post.imageUrl;
            console.log()
            if (req.file) {

                fs.unlink(`./images/postImg/${oldUrl}`, () => {

                    const postObject = {
                        text: req.body.text,
                        userId: req.body.userId,
                        imageUrl: req.file.filename,
                    };

                    // MAJ de la post avec données modifiées
                    Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Post modifié !' }))
                        .catch(error => res.status(400).json({ error }));
                });
            } else {
                const newItem = req.body;
                newItem.imageUrl = oldUrl;
                // MAJ de la post avec données modifiées
                Post.updateOne(
                    { _id: req.params.id, userId: req.body.userId },
                    { ...newItem, imageUrl: oldUrl, _id: req.params.id }
                )
                    .then(() => res.status(200).json({ message: "Post mise à jour!" }))
                    .catch((error) => res.status(400).json({ error }));
            }
        })
        .catch((error) => res.status(500).json({ error }));
};







/* Controleur like dislike */
exports.likeDislikePost = (req, res, next) => {
    console.log(req.body)

    Post.findOne({ _id: req.params.id })
        .then(post => {
            /* like d'une post */
            if (!post.usersLiked.includes(req.body.userId) && req.body.like === 1) {
                Post.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } })
                    .then(() => res.status(200).json({ message: 'post liked !' }))
                    .catch(error => res.status(400).json({ error }));
            }
            if (post.usersLiked.includes(req.body.userId) && req.body.like === 0) {
                Post.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } })
                    .then(() => res.status(200).json({ message: 'post unliked !' }))
                    .catch(error => res.status(400).json({ error }));
            }

            if (!post.usersDisliked.includes(req.body.userId) && req.body.like === -1) {
                Post.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } })
                    .then(() => res.status(200).json({ message: 'post disliked !' }))
                    .catch(error => res.status(400).json({ error }));
            }

            if (post.usersDisliked.includes(req.body.userId) && req.body.like === 0) {
                Post.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } })
                    .then(() => res.status(200).json({ message: 'post undisliked !' }))
                    .catch(error => res.status(400).json({ error }));
            }




        })
        .catch(error => res.status(500).json({ error }));
};


