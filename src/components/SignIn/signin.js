import React, { useState } from 'react'
import Button from '../Forms/Button/button';
import FormInput from '../Forms/FormInput/formInput';
import './styles.scss';
import { Link, withRouter } from 'react-router-dom';

import AuthWrapper from './../AuthWrapper/authWrapper'

import { signInWithGoogle, auth } from './../../firebase/utils';


const SignIn = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(email, password);
            resetForm();
            props.history.push('/')
        } catch(err) {
            console.log(err);
        }
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
                        <Button id="googleBtn" onClick={signInWithGoogle}>
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