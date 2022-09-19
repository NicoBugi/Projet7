import React from 'react';
import { Formik, Form, Field } from "formik";
import './form.css'
import signupUser from "@/_services/user.service"
const signup = () => {
    return (
        <Formik>
            <Form>
                <label>email</label>
                <Field className="champ" name="email" type="text" />
                <label>Nom</label>
                <Field className="champ" name="Nom" type="text" />
                <label>Prenom</label>
                <Field className="champ" name="Prenom" type="text" />
                <label>Password</label>
                <Field className="champ" name="Password" type="text" />
                <label>Confirmer Password</label>
                <Field className="champ" name="Password" type="text" />
                <button type="submit">Envoyer</button>
            </Form>
        </Formik>
    );
};

export default signup;