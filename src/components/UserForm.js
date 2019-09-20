import React, { useState, useEffect } from "react";

import {  withFormik, Form, Field, yupToFormErrors } from "formik";

import * as Yup from "yup";

import axios from "axios";

import styled from "styled-components";


const FormHeader = styled.h1`
width: 35%;
margin: auto;
text-align: center;
border: 4px solid black;
color: black;
`;

const FormFields = styled.div`
height: 500px;
border: 4px solid black;
width: 35%;
display: flex;
flex-direction: column;
margin: auto;
input{
    font-size: 2rem;
    margin: 20px
    height: 3rem;
    border: 2px solid black;
};
`;

const FormButton = styled.button`
width: 50%;
height: 3rem;
border: 2px solid black;
border-radius: 20px;
font-size: 2rem;
margin: auto;
max-height: 100%;
max-width: 100%;

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
                <FormFields>
                <Field type="text" name="Name" placeholder="Name" />
                {touched.Name && errors.Name && (
                <p className="error">{errors.Name}</p>)}
            
                <Field type="text" name="Email" placeholder="Email" />
                {touched.Email && errors.Email && (
                <p className="error">{errors.Email}</p>)}

                <Field type="text" name="Password" placeholder="Password" />
                {touched.Password && errors.Password && (
                <p className="error">{errors.Password}</p>)}

                <span>Terms of Service</span>
                <Field type="checkbox" name="Terms" checked={values.Terms} />
                       
                <FormButton>Submit</FormButton>
                </FormFields>
            </Form>
            
            {user.map(users => (
                <ul key={users.id}>
                    <li>Name: {users.Name}</li>
                    <li>Email: {users.Email}</li>
                    <li>Password: {users.Password}</li>

                </ul>
            ))}
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