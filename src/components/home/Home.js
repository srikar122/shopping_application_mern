import React from 'react'
import './Home.css'
import { Outlet } from 'react-router-dom'
import CardDetails from '../cartDetails/CardDetails'
function Home() {
  return (
    <div>
      <CardDetails></CardDetails>
    </div>
  )
}

export default Home