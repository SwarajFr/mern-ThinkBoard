import React, { use, useState } from "react";
import {Link, useNavigate} from "react-router";
import axios from "../lib/axios";
import {toast, Toaster} from "react-hot-toast";

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


    return (
    <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Welcome to <span className="text-primary">ThinkBoard</span>
                </h1>
                <p className="text-center text-gray-600 mb-8">
                    Where all your thoughts are stored ✨
                </p>
                <div className="card-body">
                    <h2 className="card-title text-2xl mb-4 text-center">Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control mb-4">
                            <label className="label" htmlFor="email">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Enter Your Email"
                                className="input input-bordered"
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label" htmlFor="email">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={username}
                                placeholder="Enter Your Username"
                                className="input input-bordered"
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label" htmlFor="password">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Enter Your Password"
                                className="input input-bordered"
                                onChange={handleOnChange}
                            />
                        </div>
                        <div className="card-actions justify-end">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>

                        <div className="mt-4 text-center">
                            <span>
                                Already have an account?{" "}
                                <Link to={"/login"} className="link link-primary">
                                    Login
                                </Link>
                            </span>
                        </div>
                    </form>
                    <Toaster/>
                </div>
            </div>
        </div>
    </div>
);


};

export default SignupPage;