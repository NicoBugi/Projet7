import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { postService } from '@/_services/post.services';
import { Formik, Form, Field, ErrorMessage } from "formik";
import reactImageSize from 'react-image-size';

const Modifypost = () => {
    const navigate = useNavigate()
    const [msg, setMsg] = useState('');
    const [postImg, setPostImg] = useState();
    const [Post, setPost] = useState([])
    const flag = useRef(false)

    useEffect(() => {
        if (flag.current === false) {
            GetPost();
        }
        return () => flag.current = true
    }, [])

    console.log(Post)
    const initialValues = {
        text: Post.text
    }

    const retour = () => {
        navigate("/home", { replace: true })
    }

    const GetPost = async () => {
        const post = await postService.getPost(URLSearchParams.get())
        setPost(post.data)
    }
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('imageUrl', postImg);
        formData.append('text', data.text);
        formData.append('userId', Post.userId);
        formData.append('id', Post.id)

        try {
            postService.modifyPost(formData)
                .then(response => {
                    navigate("/home", { replace: true });
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
    return (
        <>


            <main>
                <div className="columns columnsMain">

                    <div className="column is-one-fifth">
                        <nav className="breadcrumb" aria-label="breadcrumbs">
                            <ul>
                                <li className="is-active">
                                    <a href="#">
                                        <span>Post</span>
                                    </a>
                                </li>
                                <li><a onClick={retour} >
                                    Précédent
                                </a></li>
                            </ul>
                        </nav>

                    </div>
                    <div className="column"></div>
                </div>
                <div className="columns">
                    <div className="column"></div>
                    <div className="column is-half">
                        <div className="box">

                            <div className="message has-background-white">
                                <h2 className="message-header has-background-danger">Modifié le Post </h2>



                                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                                    <Form>
                                        {msg ? (<p className="notification is-danger is-size-6 p-2 mt-1">{msg}</p>) : ("")}
                                        <div className="field">
                                            <label htmlFor='image' className="label">Image du Post:</label>
                                            <div className="file is-danger">
                                                <label className="file-label">
                                                    <input className="file-input" type="file" name="resume" onChange={onImageChange} />
                                                    <span className="file-cta">
                                                        <span className="file-icon">
                                                            <i className="fas fa-upload"></i>
                                                        </span>
                                                        <span className="file-label">
                                                            Choose a file…
                                                        </span>
                                                    </span>
                                                </label>

                                            </div>
                                            <ErrorMessage name="title" component="p" className="notification is-danger is-light p-2 mt-1" />

                                        </div>


                                        <div className="field">
                                            <label htmlFor='text' className="label">Texte:</label>
                                            <div className="controls">
                                                <Field name="text" type="text" placeholder="text" autoComplete="off" className="input"></Field>
                                            </div>
                                            <ErrorMessage name="text" component="p" className="notification is-danger is-light p-2 mt-1" />
                                        </div>


                                        <div className="columns">
                                            <div className="column"></div>
                                            <div className="column"><button type='submit' className="button is-danger is-outlined">Modifié</button></div>
                                            <div className="column"></div>
                                        </div>

                                    </Form>
                                </Formik>
                            </div>

                        </div>

                    </div>
                    <div class="column"></div>
                </div>

            </main>
        </>
    )
};

export default Modifypost;