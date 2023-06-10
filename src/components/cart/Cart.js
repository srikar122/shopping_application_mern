import React from 'react'
import './Cart.css'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
function Cart() {

  let [data,setData] = useState([])
  let {userData} = useSelector(state => state.user)
  useEffect(()=>{
    axios.get(`http://localhost:3000/cart/getproducts/${userData.username}`)
    .then((res)=>{
        let products = res.data.payload
        setData([...products])

        
    })
    .catch(err => console.log(err))
  },[])
  return (
    <div>
      {data.map((detail,index) =>{
          return (
            <Card className='card-n' style={{ width: '20rem' }} key={index}>
            <Card.Img variant="top" src="https://source.unsplash.com/random/?shopping&1" />
            <Card.Body>
              <Card.Title>{detail.productId}</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Button variant="primary">buy🤗</Button>
            </Card.Body>
          </Card>
      )})}
    </div>
  )
}

export default Cart