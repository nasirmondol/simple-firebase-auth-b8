
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "../../firebase/firebase.init";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const auth = getAuth(app);

const Login = () => {
    const [error, setError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState('');
    const [emailError, setEmailError] = useState('');
    const emailRef = useRef(null)


    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setLoginSuccess('Successfully login')
            })
            .catch(error => { setError(error) })
        setError('');
        setLoginSuccess('');
    }

    const handleResetPassword = () => {
        const email = emailRef.current.value;


        sendPasswordResetEmail(auth, email)
            .then(result => {
                console.log(result)
                alert('Please check your email!')
            })
            .catch(error => {
                console.log(error.message);
            })
        if (!email) {
            setEmailError("email address needed", emailRef.current.value);
            return;
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            setEmailError('please provide a valid email')
            return;
        }
        setEmailError('');
    }


    return (
        <>
            <h2 className="text-3xl font-bold text-center">Login</h2>
            <div className="hero min-h-screen w-full bg-base-200">
                <div className="hero-content w-full flex-col lg:flex-row-reverse">
                    <div className="card flex-shrink-0  w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body w-full">
                            <form onSubmit={handleLogin}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        ref={emailRef}
                                        name="email"
                                        placeholder="email"
                                        className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                    <label className="label">
                                        <Link onClick={handleResetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</Link>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Login</button>
                                </div>
                            </form>
                            {
                                error && <p className="text-red-500 ">{error.message}</p>
                            }
                            {
                                loginSuccess && <p className="text-green-500">{loginSuccess}</p>
                            }
                            {
                                emailError && <p className="text-green-500">{emailError}</p>
                            }
                            <p>New to our site? <Link className="text-blue-800" to="/register">Register first</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;