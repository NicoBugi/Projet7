import React, { useEffect, useState, useRef } from 'react';
import { postService } from '@/_services/post.services';
import { accountService } from '@/_services/account.service';
import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import fr from 'timeago.js/lib/lang/fr';

timeago.register('fr', fr);

const Home = () => {

    const [allposts, setAllpost] = useState([]);
    const [profil, setProfil] = useState([]);
    const [alluser, setAlluser] = useState([]);
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
        const profil = accountService.tokenDecode(accountService.getToken());
        setProfil(profil);
    }

    const FunctionAllPosts = async () => {
        let allPosts = await postService.getAllPosts();
        setAllpost(allPosts.data);
    }

    const FunctionAllUser = async () => {
        const Alluser = await accountService.getAllUsers();
        setAlluser(Alluser.data);
    }


    const LastSeen = (date) => {
        return (<TimeAgo datetime={date} locale='fr' />);
    }

    console.log(profil.presentation)

    return (
        <>
            <div>
                <main>
                    <div className="columns">
                        <section className="column is-one-third">
                            <div class="card">
                                <div class="card-content">
                                    <div class="content">
                                        <h2 className="name" key={profil.nom}>{profil.nom} {profil.prenom}</h2>
                                        <figure class="image is-128x128">
                                            <img class="is-rounded" key={profil.imageUrl} src={profil.imageUrl} />
                                        </figure>
                                        <div className="renseignement">
                                            <h3 className="bio">Biographie</h3>
                                            <p key={profil.presentation}>{profil.presentation} </p>
                                            <br />

                                            <h3 className="email">email</h3>
                                            <p key={profil.email}>{profil.email}</p>
                                            <br />

                                            <h3 className="inscription">Inscription</h3>
                                            <p key={profil.createdAt}>{LastSeen(profil.createdAt)}</p>
                                            <br />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </section>


                        <section className="column is-one-third">
                            <div class="card">
                                <div class="card-content">
                                    <div class="content">
                                        Lorem ipsum leo risus, porta ac consectetur ac, vestibulum at eros. Donec id elit non mi porta gravida at eget metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras mattis consectetur purus sit amet fermentum.
                                    </div>
                                </div>
                            </div>

                        </section>

                        <section className="column is-one-third">
                            <div class="card">
                                <div class="card-content">
                                    <div class="content">
                                        Lorem ipsum leo risus, porta ac consectetur ac, vestibulum at eros. Donec id elit non mi porta gravida at eget metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras mattis consectetur purus sit amet fermentum.
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
