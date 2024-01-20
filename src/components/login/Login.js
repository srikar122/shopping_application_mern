/* Login.jsx */
import React from 'react';
import './Login.css';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { userlogin } from '../../slices/user';
import { useNavigate } from 'react-router-dom';

import loginImage from '../../images/signup1.jpg'; // Replace with your actual image path

function Login() {
  const { success } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onFormSubmit = (dataObj) => {
    dispatch(userlogin(dataObj));
  };

  // Redirect to userDashboard on success
  if (success === true) {
    navigate('/userDashboard');
  }

  return (
    <div className="container2">
      <div className="login-container">
        <div className="login-image-container">
          <img src={loginImage} alt="Login" className="login-image" />
        </div>

        <div className="login-form-container">
          <div className="login-form">
          <h1 className="login-heading mb-5">Login</h1>
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <div className="login-form-group">
                <label htmlFor="username" className="login-form-label">Username</label>
                <input type="text" placeholder="Enter username" {...register("username", { required: true })} className="form-control-login form-input" />
                {errors.username && <p className="text-danger">Username is required</p>}
              </div>

              <div className="login-form-group">
                <label htmlFor="password" className="login-form-label">Password</label>
                <input type="password" placeholder="Enter password" {...register("password", { required: true })} className="form-control-login form-input" />
                {errors.password && <p className="text-danger">Password is required</p>}
              </div>

              <button type="submit" className="btn-login btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
