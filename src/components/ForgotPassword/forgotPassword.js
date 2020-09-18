import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './styles.scss';

import AuthWrapper from './../AuthWrapper/authWrapper'
import FormInput from '../Forms/FormInput/formInput';
import Button from '../Forms/Button/button';

import { auth } from './../../firebase/utils';

const initialState = {
    email: '',
    errors: []
}

class ForgotPassword extends Component {
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
        })
    }

    handleFPSubmit = (e) => {
        e.preventDefault();

        try {
            const { email } = this.state;

            const config = {
                url: 'http://localhost:3000/login'
            }

            auth.sendPasswordResetEmail(email, config)
                .then(() => {
                    this.props.history.push('/login');
                })
                .catch(() => {
                    const err = ['Email doesn\'t exist. Try again.'];
                    this.setState({
                        errors: err
                    })
                });
        } catch(err) {
            console.log(err);
        }
    }

    render() {
        const { email, errors } = this.state;

        const configAuthWrapper = {
            headline: 'Forgot your password?'
        }

        return (
            <AuthWrapper {...configAuthWrapper}>
                <div className="forgotPass">
                    <div className="fP__wrap">

                        {errors.length > 0 && (
                            <ul>
                                {errors.map((e, index) => {
                                    return (
                                        <li key={index}>
                                            {e}
                                        </li>
                                    )
                                })}
                            </ul>
                        )}

                    <p>Please enter your email so you can make a new one.</p>
                        <form onSubmit={this.handleFPSubmit}>
                            <FormInput
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Enter your registered email here"
                            onChange={this.handleChange}
                            />
                            <Button type="submit">
                                Recover
                            </Button>
                        </form>
                    </div>
                </div>
            </AuthWrapper>
          );
    }
  }

export default withRouter(ForgotPassword);