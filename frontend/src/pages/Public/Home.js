import React, { useEffect, useState } from 'react';
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


    useEffect(() => {
        FunctionProfil();
        FunctionAllPosts();
        FunctionAllUser();
    })

    const FunctionProfil = async () => {
        const profil = accountService.tokenDecode(accountService.getToken());
        setProfil(profil);
    }

    const FunctionAllPosts = async () => {
        let allPosts = await postService.getAllPosts();
        setAllpost(allPosts);
    }

    const FunctionAllUser = async () => {
        const Alluser = accountService.getAllUsers();
        setAlluser(Alluser);
    }



    const LastSeen = (date) => {
        return (<TimeAgo datetime={date} locale='fr' />);
    }

    return (
        <>
            <div>
                <main>
                    <section className='Profil'></section> {/*section a gauche*/}
                    <section className='Post'>  {/*section du milieu*/}

                    </section>
                    <section className='alluser'></section> {/*section a droite*/}
                </main>
            </div>

            {/* <section className="tousLesMessages mt-5"> */}
            {/* {AllPosts.map((post, index) => {
                    return (
                        <div key={index} className="card mb-5">
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-left">
                                        <figure className="image is-48x48">
                                            <img className="userImg is-rounded" src={'../images/profilepictures/' + post.user.userImg} alt='pp' />
                                        </figure>
                                    </div>
                                    <div className="media-content">

                                        <p className="is-size-7 has-text-grey">{LastSeen(post.createdAt)}</p>
                                    </div>
                                </div>
                                <div className="content">
                                    <p>{post.postMsg}</p>
                                    <img src={post.postImg} alt="" /> */}

            {/* {isAdmin == 1 ? (<button type='button' className="button is-pulled-right is-danger is-outlined" onClick={() => { deletePost(post.id) }}>Supprimer</button>) : ('')} */}
            {/* </div>
                            </div>
                        </div>
                    )
                })}
            </section> */}
        </>
    );
};

export default Home;
