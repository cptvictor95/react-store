import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { resetPasswordStart, resetUserState } from './../../redux/User/user.actions';

import './styles.scss';

// COMPONENTS
import AuthWrapper from './../AuthWrapper/authWrapper'
import FormInput from '../Forms/FormInput/formInput';
import Button from '../Forms/Button/button';

const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    userErr: user.userErr
})

const ForgotPassword = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { resetPasswordSuccess, userErr} = useSelector(mapState);
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        if (resetPasswordSuccess) {
            dispatch(resetUserState());
            history.push('/login');
        }
    }, [dispatch, history, resetPasswordSuccess]);

    useEffect(() => {
        if (Array.isArray(userErr) && userErr.length > 0) {
            setErrors(userErr);
        }
    }, [userErr]);

    const handleFPSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPasswordStart({ email }));
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

export default ForgotPassword;