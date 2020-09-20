import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { resetPassword, resetAllAuthForms } from './../../redux/User/user.actions';

import './styles.scss';

// COMPONENTS
import AuthWrapper from './../AuthWrapper/authWrapper'
import FormInput from '../Forms/FormInput/formInput';
import Button from '../Forms/Button/button';

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    resetPasswordError: user.resetPasswordError
})

const ForgotPassword = (props) => {
    const { resetPasswordSuccess, resetPasswordError} = useSelector(mapState);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        if (resetPasswordSuccess) {
            dispatch(resetAllAuthForms());
            props.history.push('/login');
        }
    }, [dispatch, props.history, resetPasswordSuccess]);

    useEffect((resetPasswordError) => {
        if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
            setErrors(resetPasswordError);
        }
    }, [resetPasswordError]);

    const handleFPSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword({ email }));

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