import React from 'react'
import './userDashboard.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cart from '../cart/Cart'
import { Outlet,Link } from 'react-router-dom'

function UserDashboard() {
let navigate=  useNavigate()
let token = localStorage.getItem("token")
useEffect(()=>{
  let res= axios.get("http://localhost:3000/user/validate",{
    headers:{
      authorization: "Bearer "+ token
  }
  
  }).then((res)=>{
    if(res.data.message !== "success"){
      alert("unauthorized user please login")
      navigate('/login')
    }
  }
  )
  .catch((err)=>console.log(err.message))
},[])
// useEffect(async()=>{},[])

  return (
    <div className='mt-5' style={{"margin" : "100px"}}>
      <Link to ="cart" className=' bg-dark px-3 py-3 m-5'>cart</Link>
      <Outlet></Outlet>
    </div>
  )
}

export default UserDashboard