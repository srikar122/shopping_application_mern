import React from 'react';
import './Signup.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import signup1 from '../../images/signup1.jpg'

function Signup() {
  let navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onFormSubmit = async (obj) => {
    let res = await axios.post("http://localhost:3000/user/createuser", obj);
    let msg = res.data.message;
    if (msg === "success") {
      navigate('/login');
    } else {
      const er = document.getElementsByClassName("error")[0];
      er.innerHTML = `${msg}`;
    }
  };

  return (
    <div className="container mx-auto p-5">
      <form className="signup-form" onSubmit={handleSubmit(onFormSubmit)}>
        <p className="error"></p>
        <div className="form-group p-3">
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" id="inputUser" placeholder="Enter your username" {...register("username", { required: true })} />
          {errors.username && <p className='text-danger'>*Field is required</p>}
        </div>

        <div className="form-group p-3">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter your email" {...register("email", { required: true })} />
          {errors.email && <p className='text-danger'>*Field is required</p>}
        </div>

        <div className="form-group p-3">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter your password" {...register("password", { required: true })} />
          {errors.password && <p className='text-danger'>*Field is required</p>}
        </div>

        <button type="submit" className="btn btn-primary m-auto">Submit</button>
      </form>

      <div className="signup-image">
        {/* Replace 'path/to/signup-image.jpg' with your image path */}
        <img src={signup1} alt="Signup Image" style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
}

export default Signup;
