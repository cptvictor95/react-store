import React, { useState, useEffect } from 'react';
import Button from '../Forms/Button/button';
import FormInput from '../Forms/FormInput/formInput';
import './styles.scss';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser, signInWithGoogle, resetAllAuthForms } from './../../redux/User/user.actions';

import AuthWrapper from './../AuthWrapper/authWrapper'


const mapState = ({ user }) => ({
    signInSuccess: user.signInSuccess
});

const SignIn = (props) => {
    const { signInSuccess } = useSelector(mapState);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (signInSuccess) {
            resetForm();
            dispatch(resetAllAuthForms());
            props.history.push('/');
        }
    }, [signInSuccess, props.history, dispatch]);

    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(signInUser({ email, password }));
    }

    const handleGoogleSignIn = () => {
        dispatch(signInWithGoogle());
    }

    const configAuthWrapper = {
        headline: 'LogIn'
    }
    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className="signIn__wrap">
                <form onSubmit={handleSubmit}>
                    <div className="socialSignIn">
                        {/* Email */}
                        <FormInput 
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={e => setEmail(e.target.value)}
                        />
                        {/* Password */}
                        <FormInput 
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Button id="loginBtn" type="submit">
                            Login
                        </Button>
                        <Button id="googleBtn" onClick={handleGoogleSignIn}>
                            Sign In with Google
                        </Button>
                    </div>
                    <div className="forgot">
                        <Link to="/recovery">
                            Forgot your password?
                        </Link>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    )
}

export default withRouter(SignIn);