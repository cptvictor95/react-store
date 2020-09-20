import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signUpUserStart } from './../../redux/User/user.actions';
import { useHistory } from 'react-router-dom';

import AuthWrapper from './../AuthWrapper/authWrapper'
import FormInput from '../Forms/FormInput/formInput';
import Button from '../Forms/Button/button';

import './styles.scss';

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    userErr: user.userErr
});

const SignUp = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { currentUser, userErr } = useSelector(mapState);
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (currentUser) {
            resetForm();
            history.push('/');
        }
    
    }, [currentUser, history]);

    useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
        setErrors(userErr);
    }

    }, [userErr]);

    // Form Changes
    const resetForm = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]);
    }

    // Form Submit
    const handleFormSubmit = e => {
        e.preventDefault();
        dispatch(signUpUserStart({
            displayName,
            email,
            password,
            confirmPassword
        }));
    }


    const configAuthWrapper = {
        headline: 'Create your account'
    }
        return (
            <AuthWrapper {...configAuthWrapper}>
                <div className="signUp__wrap">

                    {errors.length > 0 && (
                        <ul>
                            {errors.map((err, index) => {
                                return (
                                    <li key={index}>
                                        <p>{err}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    )}

                    <form onSubmit={handleFormSubmit}>
                        <div className="userInfos">
                            {/* Name */}
                        <FormInput 
                            type="text"
                            name="displayName"
                            value={displayName}
                            placeholder="Full Name"
                            handleChange={e => setDisplayName(e.target.value)}
                        />
                        {/* Email */}
                        <FormInput 
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            handleChange={e => setEmail(e.target.value)}
                        />
                        </div>
                        {/* Password */}
                        <div className="passInputs">
                        <FormInput 
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            handleChange={e => setPassword(e.target.value)}
                        />
                        {/* Confirm Password */}
                        <FormInput 
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            handleChange={e => setConfirmPassword(e.target.value)}
                        />
                        </div>

                        <Button type="submit">
                            Create Account
                        </Button>
                    </form>
                </div>
            </AuthWrapper>
        )
}

export default SignUp;
