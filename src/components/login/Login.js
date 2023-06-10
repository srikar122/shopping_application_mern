import React from 'react'
import './Login.css'
import {useForm} from 'react-hook-form'
import {useSelector,useDispatch} from 'react-redux'
import { userlogin } from '../../slices/user'
import { useNavigate } from 'react-router-dom'


function Login() {
  let {users,success,ispending,isfulfilled,iserror,errormsg} = useSelector(state=>state.user)
  let dispatch = useDispatch()
  let navigate = useNavigate()

  let {register, handleSubmit, formState:{errors}} = useForm()

const onformSubmit = (dataObj)=>{
   dispatch(userlogin(dataObj))

}
if(success === true){
  navigate('/userDashboard')
}

return (

    <div>
      <form action="" onSubmit={handleSubmit(onformSubmit)}>
        username: <input type="text" placeholder='enter user name' {...register("username",{required:true})} />
        {errors.username && <p className='text-danger'> username is required</p> }
        password: <input type="text" placeholder='enter user name' {...register("password",{required:true})} />
        {errors.password && <p className='text-danger'> password is required</p> }
        <button type='submit'> login</button>
      </form>
    </div>
  )
}

export default Login