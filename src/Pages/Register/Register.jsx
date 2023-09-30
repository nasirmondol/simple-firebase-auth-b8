import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";
import { BsEyeSlashFill } from 'react-icons/bs';
import { AiFillEye } from 'react-icons/ai';
import { Link } from "react-router-dom";

const auth = getAuth(app);
const Register = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [passError, setPassError] = useState('');
    const [termsError, setTermsError] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = (e) => {

        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const termsConditions = e.target.terms.checked;
        console.log(termsConditions);


        if (password.length < 6) {
            setPassError('Password should be 6 characters or longer')
            return;
        }
        else if (!/^(?=.*[A-Z])(?=.*[\W]).+$/.test(password)) {
            setPassError('One uppercase & special characters needed')
            return;
        }
        else if (!termsConditions) {
            setTermsError('Accept our terms and conditions!')
            return;
        }

        setError('');
        setSuccess('');
        setPassError('');
        setTermsError('');

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                if (result.user.emailVerified) {
                    setSuccess('User Created successfully')
                }
                else {
                    alert('Please verified your email')
                }

                // Update user name
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: 'https://lh3.googleusercontent.com/a/ACg8ocKzI30a55XX4xLffMItvnBlP4OPYtRV1R3oGp38WVCqG2w=s288-c-no'
                })
                .then(() => {
                   console.log('update name success')
                  }).catch(error =>{
                    console.log(error.message)
                  })

                // Send verification email
                sendEmailVerification(result.user)
                    .then(() => {
                        alert('Check and verify your email')
                    })
            })
            .catch(error => {
                console.log(error);
                setError(error)
            })
    }

    return (
        <div className="hero min-h-screen w-full bg-base-200">
            <div className="hero-content w-full flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleRegister}>
                            <div className="form-control w-96">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="Your Name" required className="input input-bordered w-full" name="name" />
                            </div>
                            <div className="form-control w-96">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="Your Email" required className="input input-bordered w-full" name="email" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="flex items-center w-96">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required name="password"
                                        placeholder="password"
                                        className="input input-bordered w-full" />
                                    <button onClick={() => setShowPassword(!showPassword)} className="absolute end-10" >{
                                        showPassword ? <BsEyeSlashFill></BsEyeSlashFill> : <AiFillEye></AiFillEye>
                                    }</button>
                                </div>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div>
                                <input type="checkbox" name="terms" id="terms" />
                                <label className="ml-2" htmlFor="terms"><Link to="/">Accept our terms and conditions</Link></label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>
                        </form>
                        {error && <p className="text-red-500 w-96">{error.message}</p>}
                        {
                            success && <p className="text-green-500 w-96">{success}</p>
                        }
                        {
                            passError && <p className="text-red-500 w-96">{passError}</p>
                        }
                        {
                            termsError && <p className="text-red-500 w-96">{termsError}</p>
                        }
                        <p>Already have an account? <Link className="text-blue-700" to="/login">please Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;