import React, { useState, useEffect } from "react";

import {  withFormik, Form, Field, yupToFormErrors } from "formik";

import * as Yup from "yup";

import axios from "axios";

import styled from "styled-components";


const FormHeader = styled.h1`
  text-align: center;
  border: 4px solid black;
  color: black;
`;


const UserForm = ({ values, errors, touched, status }) => {

    const [ user, setUser ] = useState([]);
    useEffect(() => {
        if(status){
            setUser([...user, status]);
        }
    }, [status]);

    return(
        <div className="formik-form">
            <FormHeader>I am form!</FormHeader>

            <Form>

                <Field type="text" name="Name" placeholder="Name" />

            






            </Form>
        </div>
        

    )
}


const FormikUserForm = withFormik({
    mapPropsToValues({ Name, Email, Password, Terms}){
        return{
            Name: Name || "",
            Email: Email || "",
            Password: Password || "",
            Terms: Terms || false
        };
    },
    validationSchema: Yup.object().shape({
        Name: Yup.string().required(),
        Email: Yup.string().required(),
        Password: Yup.string().required()
    }),
    handleSubmit(values, {setStatus}){
        axios.post("https://reqres.in/api/users/", values)
        .then(response => {
            setStatus(response.data);
        })
        .catch(error => console.log(error.response));
    }
})(UserForm);

console.log("HOC", FormikUserForm);

export default FormikUserForm;