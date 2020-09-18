import React, { Component } from 'react'
import Button from '../Forms/Button/button';
import FormInput from '../Forms/FormInput/formInput';
import './styles.scss';
import { Link } from 'react-router-dom';

import AuthWrapper from './../AuthWrapper/authWrapper'

import { signInWithGoogle, auth } from './../../firebase/utils'

const initialState = {
    email: '',
    password: ''
}

class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            ...initialState
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({
                ...initialState
            });
        } catch(err) {
            console.log(err);
        }
    }
    render() {
        const { email, password} = this.state;

        const configAuthWrapper = {
            headline: 'LogIn'
        }
        return (
            <AuthWrapper {...configAuthWrapper}>
                <div className="signIn__wrap">
                    <form onSubmit={this.handleSubmit}>
                        <div className="socialSignIn">
                            {/* Email */}
                            <FormInput 
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Email"
                                onChange={this.handleChange}
                            />
                            {/* Password */}
                            <FormInput 
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Password"
                                onChange={this.handleChange}
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
}

export default SignIn;