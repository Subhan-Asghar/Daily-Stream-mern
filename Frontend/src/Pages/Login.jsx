import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import usercontext from '../context/user_context';

const Login = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [message, setmessage] = useState('');
    const { setuser } = useContext(usercontext);

    const user_login = async () => {
        const data = {
            email,
            password,
        };

        try {
            await axios.post('http://localhost:3000/login', data).then((res) => {
                const result = res.data.message;
                setmessage(result);

                if (result === "User Login") {
                    setuser(true);
                }
            }).catch((err) => {
                if (err.response && err.response.status === 401) {
                    setmessage("Invalid email or password. Please try again.");
                } else {
                    setmessage("An error occurred. Please try again later.");
                }
                console.error('Error:', err);
            });
        } catch (err) {
            console.error('Error:', err);
            setmessage("An error occurred during login.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-red-600 to-red-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800">Sign In</h2>
                <p className="text-sm text-center text-gray-600 mb-6 pt-3">
                    Welcome back! Please enter your credentials to log in.
                </p>
                <p className="text-sm text-center text-red-600 mb-4">{message}</p>
                <div className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-red-500 focus:border-red-500"
                            placeholder="you@example.com"
                            required
                            onChange={(e) => {
                                setemail(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-red-500 focus:border-red-500"
                            placeholder="••••••••"
                            required
                            onChange={(e) => {
                                setpassword(e.target.value);
                            }}
                        />
                    </div>
                    <button
                        className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        onClick={user_login}
                    >
                        Sign In
                    </button>
                </div>
                <p className="mt-6 text-sm text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link to={'/register'} className="font-medium text-red-600 hover:text-red-500">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
