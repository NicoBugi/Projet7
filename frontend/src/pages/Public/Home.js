import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postService } from '@/_services/post.services';
import { accountService } from '@/_services/account.service';
import { userService } from '@/_services/user.service';

import TimeAgo from 'timeago-react';
import * as timeago from 'timeago.js';
import fr from 'timeago.js/lib/lang/fr';
timeago.register('fr', fr);

const Home = () => {
    const navigate = useNavigate()
    useEffect(() => {
    })

    const addPost = () => {
        navigate("/addpost", { replace: true })
    }

    const allPosts = async () => {
        let Posts = await postService.getAllPosts();
        const allPosts = []
        for (let post of Posts.data) {
            allPosts.push(post)
        }
        return allPosts
    }

    // console.log(allPosts())

    class diplayPost extends React.Component {
        render() {
            return (
                <div key={post.index} className="card mb-5">
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
                            <img src={post.postImg} alt="" />

                            {/* {isAdmin == 1 ? (<button type='button' className="button is-pulled-right is-danger is-outlined" onClick={() => { deletePost(post.id) }}>Supprimer</button>) : ('')} */}
                        </div>
                    </div>
                </div>
            )
        }
    }


    const user = async () => {
        const posts = await allPosts()
        for (let post of posts) {
            let user = await userService.getUser(post.userId)

        }
    }

    user()

    const Profil = async () => {
        const profil = accountService.tokenDecode(accountService.getToken())
        const recupProfil = await userService.getUser(profil.userId)

        return recupProfil
    }
    const modifyUser = (() => {
        navigate("../profil", { replace: true })
    })

    Profil()

    const LastSeen = (date) => {
        return (<TimeAgo datetime={date} locale='fr' />);
    }

    return (
        <>
            <div>
                <main>
                    <section className='Profil'><button onClick={modifyUser}>Modifier Profil</button></section> {/*section a gauche*/}
                    <section className='Post'>  {/*section du milieu*/}
                        <button onClick={addPost}>Ajouter un post</button>
                    </section>
                    <section className='alluser'></section> {/*section a droite*/}
                </main>
            </div>

            {/* <section className="tousLesMessages mt-5">
                
            </section> */}
        </>
    );
};

export default Home;
