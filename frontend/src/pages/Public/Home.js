import React, { useEffect, useRef, useState } from 'react';
import { postService } from '@/_services/post.services';
import { accountService } from '@/_services/account.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import reactImageSize from 'react-image-size';
import { Formik, Form, Field, ErrorMessage } from "formik";
import HeartR from '@/Images/clipart128058.png';
import HeartB from '@/Images/clipart116502.png';
import { faUpload, faStarHalfStroke, faTrashAlt, faPenToSquare } from '@fortawesome/free-solid-svg-icons'


import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import fr from 'timeago.js/lib/lang/fr';
timeago.register('fr', fr);

const Home = () => {

    const [allpost, setAllpost] = useState([]);
    let [Element, setElement] = useState(false)
    const [msg, setMsg] = useState('');
    const [postImg, setPostImg] = useState();
    const [ImagePreview, setImagePreview] = useState();
    const [ImagePreviewName, setImagePreviewName] = useState("");
    const [profil, setProfil] = useState([]);
    const [alluser, setAlluser] = useState([]);
    const [FieldValueHidden, setFieldValue] = useState("");


    const flag = useRef(false)

    useEffect(() => {
        if (flag.current === false) {
            FunctionProfil();
            FunctionAllPosts();
            FunctionAllUser();

        }

        return () => flag.current = true
    }, [])

    const FunctionProfil = async () => {
        const GetProfil = await accountService.tokenDecode(accountService.getToken());
        setProfil(GetProfil);
    }

    const FunctionAllPosts = async () => {
        let GetallPosts = await postService.getAllPosts();
        setAllpost(GetallPosts.data);
    }

    const FunctionAllUser = async () => {
        const GetAlluser = await accountService.getAllUsers();
        setAlluser(GetAlluser.data);
    }

    const deletePost = (data) => {
        postService.deletePost(data)
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            })
    };

    function openModal(index) {
        // Add is-active class on the modal
        document.getElementById("modal" + index).classList.add("is-active");
    }

    // Function to close the modal
    function closeModal(index) {
        document.getElementById("modal" + index).classList.remove("is-active");
    }

    const LastSeen = (date) => {
        return (<TimeAgo datetime={date} locale='fr' />);
    }

    const initialValues = {
        text: "",
    }



    const onSubmitModif = async (data) => {
        const formData = new FormData();
        formData.append('imageUrl', postImg);
        if (data.text === '') {
            formData.append('text', FieldValueHidden.post.text);
        } else {
            formData.append('text', data.text);
        }
        formData.append('userId', FieldValueHidden.post.userId);
        formData.append('id', FieldValueHidden.post._id)

        try {
            postService.modifyPost(formData)
                .then(response => {
                    window.location.reload();
                })
                .catch(error => {
                    setMsg(error);
                })

        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    const onImageChange = async (event) => {

        setImagePreviewName(event.target.files[0].name)
        if (event.target.files && event.target.files[0]) {
            setImagePreview(URL.createObjectURL(event.target.files[0]));
        }
        try {
            const { width, height } = await reactImageSize(URL.createObjectURL(event.target.files[0]));
            if (width <= 10000 && height <= 10000) {
                setMsg();
                setPostImg(event.target.files[0]);
            } else {
                setMsg("Veuillez sélectionner une image dont les dimensions n'excédent pas 250x250");
            }
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    const ProfilUser = () => {
        return (
            <div className="card card-contentleft" >
                <div className="card-content ">
                    <div className="content BoxInfo">
                        <h2 className="name is-size-5" key={profil.nom}>{profil.nom} {profil.prenom}</h2>
                        <div className="centerImageprofil">
                            <figure className="image is-128x128">
                                <img className="is-rounded" key={profil.imageUrl} alt="profil avatar" src={profil.imageUrl} />
                            </figure>
                        </div>

                        <div className="renseignement">
                            <h3 className="bio is-size-5">Biographie</h3>
                            <span className="is-divider"></span>
                            <p key={profil.presentation}>{profil.presentation} </p>
                            <br />

                            <h3 className="email is-size-5">email</h3>
                            <span className="is-divider"></span>
                            <p className=" is-size-6" key={profil.email}>{profil.email}</p>
                            <br />

                            <h3 className="inscription is-size-5">Inscription</h3>
                            <span className="is-divider"></span>
                            <p className=" is-size-6" key={profil.createdAt}>{LastSeen(profil.createdAt)}</p>
                            <br />

                        </div>
                    </div>
                </div>
            </div >
        );
    }

    const allusers = alluser.map((user) => {
        return (
            <li className="user" key={user._id}>
                <img src={user.imageUrl} alt="" key={user.nom} />
                <span className="nom" key={user.avatar}>
                    {user.role === 1 ? <FontAwesomeIcon icon={faStarHalfStroke} /> : null} {user.nom}<br />@{user.prenom}
                </span>

            </li>
        );

    });


    const controleLike = (async (postid) => {
        let recupPost = await postService.getPost(postid)

        if (recupPost.data.post.usersLiked.includes(profil.userId)) {
            Element = true
            setElement(Element)
        } else if (!recupPost.data.post.usersLiked.includes(profil.userId)) {
            Element = false
            setElement(Element)
        }
        let textLike = document.getElementsByClassName("nbLike")[0]
        textLike.innerText = recupPost.data.post.likes

    })

    const affichageLike = (async (postid) => {
        let recupPost = await postService.getPost(postid)
        let textLike = document.getElementsByClassName("nbLike")[0]
        textLike.innerText = recupPost.data.post.likes

    })

    const allposts = allpost.map((post, index) => {
        { controleLike(post.post._id) }
        const Liked = (() => {

            if (Element === false) {
                console.log("j'aime")
                let data = {
                    _id: post.post._id,
                    likes: 1,
                    userId: profil.userId
                }

                try {
                    postService.likedPost(data)
                        .then(
                            setElement(!Element),
                            affichageLike(post.post._id)

                        )
                        .catch(error => {
                            setMsg(error);
                        })
                } catch (error) {
                    if (error.response) {
                        setMsg(error.response.data.msg);
                    }
                }
            }
            else if (Element === true) {
                console.log("j'aime pas")
                let data = {
                    _id: post.post._id,
                    likes: -1,
                    userId: profil.userId
                }


                try {
                    postService.likedPost(data)
                        .then(
                            setElement(!Element),

                            affichageLike(post.post._id)

                        )
                        .catch(error => {
                            setMsg(error);
                        })

                } catch (error) {
                    if (error.response) {
                        setMsg(error.response.data.msg);
                    }
                }
            }
        })
        return (

            <li className="post" key={post.post._id}>

                <div className="card">
                    <div className="card-image">
                        {post.post.imageUrl !== "undefined" ? (<figure className="image is-4by3">
                            <img src={"http://localhost:3000/images/postImg/" + post.post.imageUrl} alt="ImagePost" />
                        </figure>) : ("")}

                    </div>
                    <div className="card-content">
                        <div className="media">
                            <div className="media-left">
                                <figure className="image is-48x48">
                                    <img src={post.user.imageUrl} alt="ImageUser" />
                                </figure>
                            </div>
                            <div className="media-content">

                                <p className="title is-4">{post.user.nom}
                                    {post.post.userId === profil.userId || profil.role === 1 ? (
                                        <span className="IconAction">
                                            <span onClick={() => { openModal(index); }} className="iconModify">
                                                <FontAwesomeIcon icon={faPenToSquare} className="js-modal-trigger fa fa-trash" />
                                            </span>
                                            <span className="iconDelete"><FontAwesomeIcon icon={faTrashAlt} className="fa fa-trash"
                                                onClick={() => {
                                                    if (window.confirm("Voulez-vous supprimer ce post?")) {
                                                        deletePost(post.post._id);
                                                    }
                                                }} /></span>
                                        </span>
                                    ) : ('')}
                                </p>
                                <p className="subtitle is-6">@{post.user.prenom}</p>

                                <label className="custom-checkbox">
                                    <div
                                        className="container"

                                        onClick={Liked}
                                    >
                                        {Element === false ? (
                                            <img src={HeartB} className='imgheight' />
                                        ) : (
                                            <img src={HeartR} className='imgheight' />
                                        )}
                                    </div>

                                </label>

                                <div className='nbLike'>
                                    {/* {nbLike} */}
                                </div>

                            </div>
                        </div>
                        <span className="is-divider2"></span>
                        <div className="content">
                            {post.post.text}.
                            <br />
                            <span>{LastSeen(post.post.createdAt)}</span>
                        </div>
                    </div>
                </div>


                <div className="modal" id={"modal" + index}>
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">
                                Modifier mon post
                            </p>
                            <button className="delete" onClick={() => { closeModal(index); }} aria-label="close">
                            </button>
                        </header>
                        <section className="modal-card-body">
                            <div className="box">
                                <div className="message has-background-white">
                                    <Formik initialValues={initialValues} onSubmit={onSubmitModif}>
                                        <Form className="formAddPost">
                                            {msg ? (<p className="notification is-danger is-size-6 p-2 mt-1">{msg}</p>) : ("")}
                                            <div className="field">
                                                <label htmlFor='image' className="label">Image du Post:</label>
                                                <div className="file is-danger fileBtnAddPost">
                                                    <label className="file-label">
                                                        <input className="file-input" type="file" name="resume" onChange={onImageChange} />
                                                        <span className="file-cta">
                                                            <span className="file-icon">
                                                                <FontAwesomeIcon icon={faUpload} />
                                                            </span>
                                                            <span className="file-label">
                                                                Choisir un fichier…
                                                            </span>
                                                            <span className="file-labelName">
                                                                {ImagePreviewName}
                                                            </span>
                                                        </span>
                                                    </label>
                                                </div>
                                                <figure className="image is-256x256">
                                                    <img className="" key={ImagePreview} src={ImagePreview} alt="previsualisation du post" />
                                                </figure>
                                                <ErrorMessage name="title" component="p" className="notification is-danger is-light p-2 mt-1" />
                                            </div>

                                            <div className="field">
                                                <label htmlFor='text' className="label">Texte:</label>
                                                <div className="controls">
                                                    <Field as="textarea" id="text" className="text" rows="6" name="text" placeholder={post.post.text}></Field>
                                                </div>


                                                <input type="hidden" value={post.post.userId} name="hiddenField" />

                                                <ErrorMessage name="text" component="p" className="notification is-danger is-light p-2 mt-1" />
                                            </div>
                                            <div className="columns">
                                                <div className="column"></div>
                                                <div className="column"><button type='submit' className="button is-danger is-outlined" onClick={() => { setFieldValue(post); }} >Modifier mon post</button></div>
                                                <div className="column"></div>
                                            </div>
                                        </Form>
                                    </Formik>
                                </div>
                            </div>


                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-danger" onClick={() => { closeModal(index); }}>
                                Cancel

                            </button>
                        </footer>
                    </div>
                </div>
            </li >

        );
    });

    return (
        <>
            <div>
                <main>
                    <div className="columns columnsMain">

                        <section className="center column is-one-fifth">
                            {ProfilUser()}
                        </section>

                        <section className="column is-half">
                            <ul className="eachPost">
                                {allposts}
                            </ul>
                        </section>

                        <section className="column is-one-third">
                            <div className="card ">
                                <div className="card-content">
                                    <div className="content">
                                        <aside className="asideHome">
                                            <div className="divContainer">
                                                <h2 className="h2user">Utilisateurs</h2>
                                                <span className="is-divider"></span>
                                                <br />
                                                <ul className="eachUser">{allusers}</ul>
                                            </div>
                                        </aside>
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                </main>
            </div >
        </>
    );
};

export default Home;
