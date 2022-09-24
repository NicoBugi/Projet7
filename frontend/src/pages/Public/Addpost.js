import React, { createElement, useRef, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from 'react-router-dom';
import { accountService } from "@/_services/account.service";
import { postService } from "@/_services/post.services"
import reactImageSize from 'react-image-size';

const Addpost = () => {
    const [msg, setMsg] = useState('');
    const [postImg, setPostImg] = useState();
    const navigate = useNavigate();
    const flag = useRef(false)

    const initialValues = {
        title: "",
        text: ""
    }

    useEffect(() => {
        if (flag.current === false) {

        }

        return () => flag.current = true
    }, [])

    const retour = () => {
        navigate("/home", { replace: true })
    }

    const onSubmit = async (data) => {
        const profil = accountService.tokenDecode(accountService.getToken())
        const formData = new FormData();
        formData.append('imageUrl', postImg);
        formData.append('text', data.text);
        formData.append('userId', profil.userId);

        try {
            postService.createPost(formData)
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
                <div class="columns columnsMain">
                    <div class="column is-one-fifth">
                        <nav class="breadcrumb" aria-label="breadcrumbs">
                            <ul>
                                <li class="is-active">
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
                    <div class="column"></div>
                </div>
                <div class="columns">
                    <div class="column"></div>
                    <div class="column is-half">
                        <div class="box">
                            <div className="message has-background-white">
                                <h2 className="message-header has-background-danger">Ajouter un Post</h2>

                                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                                    <Form>
                                        {msg ? (<p className="notification is-danger is-size-6 p-2 mt-1">{msg}</p>) : ("")}
                                        <div className="field">
                                            <label htmlFor='image' className="label">Image du Post:</label>
                                            <div class="file is-danger">
                                                <label class="file-label">
                                                    <input class="file-input" type="file" name="resume" onChange={onImageChange} />
                                                    <span class="file-cta">
                                                        <span class="file-icon">
                                                            <i class="fas fa-upload"></i>
                                                        </span>
                                                        <span class="file-label">
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

                                        <div class="columns">
                                            <div class="column"></div>
                                            <div class="column"><button type='submit' className="button is-danger is-outlined">Connexion</button></div>
                                            <div class="column"></div>
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
    );
}

export default Addpost;