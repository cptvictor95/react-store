import React, { Component } from 'react'
import FormInput from '../Forms/FormInput/formInput';
import Button from '../Forms/Button/button';

import { auth, handleUserProfile } from './../../firebase/utils';

import './styles.scss';


const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: []
};

class SignUp extends Component {
    constructor(props) {
        super(props);
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

    handleFormSubmit = async e => {
        e.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            const err = ['Password don\'t match.'];
            this.setState({
                errors: err
            })
            return;
        }

        try {

            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            await handleUserProfile(user, { displayName });

            this.setState({
                ...initialState
            })


        } catch(err) {
            console.log(err);
        }
    }

    render() {
        const { displayName, email, password, confirmPassword, errors } = this.state;
        return (
            <div className="signUp">
                <div className="signUp__wrap">
                    <h2>Create account</h2>

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
                    <div className="form__wrap">

                        <form onSubmit={this.handleFormSubmit}>
                            {/* Name */}
                            <FormInput 
                                type="text"
                                name="displayName"
                                value={displayName}
                                placeholder="Full Name"
                                onChange={this.handleChange}
                            />
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
                            {/* Confirm Password */}
                            <FormInput 
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                placeholder="Confirm Password"
                                onChange={this.handleChange}
                            />


                            <Button type="submit">
                                Create
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp;
