import React, { use, useState } from "react";
import {Link, useNavigate} from "react-router";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const SignupPage = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        username: "",
        password: "",
    });
    const  { email, password, username } = inputValue;
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue, 
            [name]: value
        }); 
    };

    const handleError = (err) => {
        toast.error(err);
    }

    const handleSuccess = (msg) => {
        toast.success(msg)
    }

    const handleSubmit =  async (e) => {
        e.preventDefault();
        try {
            const data = await api.post(
                "/signup",
                {
                    ...inputValue,
                },
                {withCredentials: true}
            );
            const {success, message} = data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/");

                }, 1000);
            } else {
                handleError(message);
            }
        }catch (error) {
            console.log(error);
        }
        setInputValue({
            ...inputValue,
            email: "",
            password: "",
            username: "",
        });
    }
    
};



export default SignupPage;