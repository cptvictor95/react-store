import React, { Component } from 'react'
import Button from '../Forms/Button/button';
import './styles.scss';

import { signInWithGoogle } from './../../firebase/utils'

class SignIn extends Component {
    handleSubmit = async e => {
        e.preventDefault();
    }
    render() {
        return (
            <div className="signIn">
    
                <div className="wrap">
                    <h2>Login</h2>
    
                    <div className="formWrap">
                        <form onSubmit={this.handleSubmit}>
                            <div className="socialSignIn">
                                <Button onClick={signInWithGoogle}>
                                    Sign In with Google
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignIn;