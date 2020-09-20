import React, { useState, useEffect } from 'react'
import FormInput from '../Forms/FormInput/formInput';
import Button from '../Forms/Button/button';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser, resetAllAuthForms } from './../../redux/User/user.actions';

import { withRouter } from 'react-router-dom';

import AuthWrapper from './../AuthWrapper/authWrapper'

import './styles.scss';

const mapState = ({ user }) => ({
    signUpSuccess: user.signUpSuccess,
    signUpError: user.signUpError
});

const SignUp = (props) => {
    const { signUpSuccess, signUpError} = useSelector(mapState);
    const dispatch = useDispatch();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (signUpSuccess) {
            resetForm();
            dispatch(resetAllAuthForms());
            props.history.push('/login');
        }
    }, [dispatch, props.history, signUpSuccess])
    useEffect(() => {
        if (Array.isArray(signUpError) && signUpError.length > 0) {
            setErrors(signUpError)
        }
    }, [signUpError])

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
        dispatch(signUpUser({
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

export default withRouter(SignUp);
