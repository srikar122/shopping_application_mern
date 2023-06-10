import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './cardDetails.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



function CardDetails() {
  let navigate = useNavigate() 
  let token = localStorage.getItem("token")
  let {userData,success} = useSelector(state=>state.user)
  let [added,setAdded] = useState(false)

  const addToCart= async(detail)=>{
    if(userData === null){
      alert("login to add to cart")
      navigate("/login")

    }
    else {
   const res  = await axios.post("http://localhost:3000/cart/addProduct",
   {usename:userData.username,productId:detail.productId},
   {headers:{
    Authorization :"Bearer " +token
   }}
  
   )
  
    console.log(userData.username,success,detail)
    if(res.data.message == "success"){
        alert("added to cart")
        setAdded(true)
    }
    else{
      console.log(res.data.message)
      alert("login to add to cart")
      navigate("/login")
    }
  }
  }

    let [details,setDetails] = useState([])
    useEffect(()=>{
 
        (async()=>{
      
         axios.get("http://localhost:3000/product/getproducts")
         .then((res)=>{
          let data = res.data.payload
          setDetails([...data])
         })
         .catch((err)=>console.log(err))
        }       
        )()
  
    },[])


    let img = []
    for(let  i = 0;i<details.length;i++){
      img.push("https://source.unsplash.com/random/?shopping&1")
    }





  return (
    <div className='cards'>
      {details.map((detail,index) =>{
          return (
            <Card className='card-n' style={{ width: '20rem' }} key={index}>
            <Card.Img variant="top" src={img[index]} />
            <Card.Body>
              <Card.Title>{detail.productId}</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <Button variant="primary" onClick={()=>addToCart(detail)} >add to cart</Button>
            </Card.Body>
          </Card>
          )  
      })}

        
    </div>

  )
}

export default CardDetails