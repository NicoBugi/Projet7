import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { userService } from "@/_services/user.service";
import { accountService } from '../../_services/account.service';

const Profil = () => {
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
    })

    const RecupProfil = async () => {
        const profil = accountService.tokenDecode(accountService.getToken())
        const recupProfil = await userService.getUser(profil.userId)
        return recupProfil.data
    }




    const initialValues = {
        email: RecupProfil().email,
        password: "",
        nom: RecupProfil().nom,
        prenom: RecupProfil().prenom,
        presentation: RecupProfil().presentation,

    };


    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Veuillez entrer une adresse email valide").required("Veuillez entrer votre adresse email"),
        lastname: Yup.string().required("Veuillez entrer votre nom"),
        prenom: Yup.string().required("Veuillez entrer votre prenom"),
        password: Yup.string().required("Veuillez entrer un mot de passe")
    });



    const onSubmit = (data) => {

        try {
            userService.updateUser(accountService.tokenDecode(accountService.getToken()).userId)
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
    return (
        <>
            <div className="message is-dark">
                <h2 className="message-header has-background-link">Modifier</h2>
                <div className="message-body">
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        <Form>
                            {msg ? (<p className="notification is-danger is-size-6 p-2 mt-1">{msg}</p>) : ("")}
                            <div className="field">
                                <label htmlFor='nom' className="label">Nom:</label>
                                <div className="controls">
                                    <Field name="nom" type="text" placeholder="Nom" autoComplete="off" className="input"></Field>
                                </div>
                                <ErrorMessage name="nom" component="p" className="notification is-danger is-light p-2 mt-1" />
                            </div>
                            <div className="field">
                                <label htmlFor='prenom' className="label">Prenom:</label>
                                <div className="controls">
                                    <Field name="prenom" type="text" placeholder="Prenom" autoComplete="off" className="input"></Field>
                                </div>
                                <ErrorMessage name="prenom" component="p" className="notification is-danger is-light p-2 mt-1" />
                            </div>
                            <div className="field">
                                <label htmlFor='email' className="label">Email:</label>
                                <div className="controls">
                                    <Field name="email" type="text" placeholder="Email" autoComplete="off" className="input"></Field>
                                </div>
                                <ErrorMessage name="email" component="p" className="notification is-danger is-light p-2 mt-1" />
                            </div>
                            <div className="field">
                                <label htmlFor='password' className="label">Mot de passe:</label>
                                <div className="controls">
                                    <Field name="password" type="password" placeholder="******" autoComplete="off" className="input"></Field>
                                </div>
                                <ErrorMessage name="password" component="p" className="notification is-danger is-light p-2 mt-1" />
                            </div>
                            <div className="field">
                                <label htmlFor='presentation' className="label">Presentation:</label>
                                <div className="controls">
                                    <Field name="presentation" type="text" placeholder="presentation" autoComplete="off" className="input"></Field>
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor='image' className="label">Image utilisateur:</label>
                                <div className="controls">
                                    <Field name="presentation" type="text" placeholder="presentation" autoComplete="off" className="input"></Field>
                                </div>
                            </div>
                            <button type='submit' className="button is-link is-outlined mt-2">Modifier</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default Profil;