import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postService } from '@/_services/post.services';
import { accountService } from '@/_services/account.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import fr from 'timeago.js/lib/lang/fr';
timeago.register('fr', fr);

const Home = () => {

    const [allpost, setAllpost] = useState([]);
    const [profil, setProfil] = useState([]);
    const [alluser, setAlluser] = useState([]);
    const navigate = useNavigate()
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

    const UpdatePost = (data) => {
        navigate("/modifypost?id=" + data, { replace: true })
    };

    const LastSeen = (date) => {
        return (<TimeAgo datetime={date} locale='fr' />);
    }

    const ProfilUser = () => {
        return (
            <div className="card card-contentleft" >
                <div className="card-content ">
                    <div className="content BoxInfo">
                        <h2 className="name is-size-5" key={profil.nom}>{profil.nom} {profil.prenom}</h2>
                        <div className="centerImageprofil">
                            <figure className="image is-128x128">
                                <img className="is-rounded" key={profil.imageUrl} src={profil.imageUrl} />
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

    const allposts = allpost.map((post) => {
        return (
            <li className="post" key={post.post._id}>
                <div className="card">
                    <div className="card-image">
                        <figure className="image is-4by3">
                            <img src={post.post.imageUrl} alt="ImagePost" />
                        </figure>
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
                                    <div className="IconAction">
                                        <span className="iconModify"><FontAwesomeIcon icon={faPenToSquare} className="fa fa-trash"
                                            onClick={() => {
                                                UpdatePost(post.post._id);
                                            }} /></span>

                                        <span className="iconDelete"><FontAwesomeIcon icon={faTrashAlt} className="fa fa-trash"
                                            onClick={() => {
                                                if (window.confirm("Voulez-vous supprimer ce post?")) {
                                                    deletePost(post.post._id);
                                                }
                                            }} /></span>
                                    </div>

                                </p>
                                <p className="subtitle is-6">@{post.user.prenom}</p>
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

            </li>
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
