import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import './styles.scss';

import AuthWrapper from './../AuthWrapper/authWrapper'
import FormInput from '../Forms/FormInput/formInput';
import Button from '../Forms/Button/button';

import { auth } from './../../firebase/utils';


const ForgotPassword = (props) => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);

    const handleFPSubmit = (e) => {
        e.preventDefault();

        try {
            const config = {
                url: 'http://localhost:3000/login'
            }

            auth.sendPasswordResetEmail(email, config)
                .then(() => {
                    props.history.push('/login');
                })
                .catch(() => {
                    const err = ['Email doesn\'t exist. Try again.'];
                    setErrors(err);
                });
        } catch(err) {
            console.log(err);
        }
    }


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
                        <form onSubmit={handleFPSubmit}>
                            <FormInput
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Enter your registered email here"
                            handleChange={e => setEmail(e.target.value)}
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

export default withRouter(ForgotPassword);