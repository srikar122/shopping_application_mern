import React from 'react'
import './Recommend.css'
import {useForm} from 'react-hook-form'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button';

function Recommend(props) {
  let {register, handleSubmit} = useForm()
  let [product,setProduct] = useState("")

  let [flag,setFlag] = useState(false)
  // let [recommendedProducts,setRecommendedProducts] = useState([])

  let onFormSubmit = async (obj)=>{
    // let pro = obj.rec
    // console.log(obj.rec)
    // let res = await axios.get(`http://localhost:127.0.0.1:5000/recommend/${obj.rec}`)
    // console.log(res)
    setProduct(obj.rec)
    setFlag(true)

  }
  // useEffect(()=>{
   
  //     let fun = async()=>{
  //       try {
  //         const response = await axios.get(`http://127.0.0.1:5000/recommend/${props.title}`);
  //         // setRecommendations(response.data.recommended_products);
  //         console.log(response.data.recommended_products)
  //         setRecommendedProducts(response.data.recommended_products)
  //       } catch (error) {
  //         console.error('Error fetching recommendations:', error);
  //       }
    
  //   fun()
  //   console.log("in")
  //   setFlag(false)
  // }

  //   // setProduct(pro)
  // },[])
  window.scrollTo(0, 0);
  return (
    // <div>
    //   <form onSubmit={handleSubmit(onFormSubmit)}>
    //   <input {...register("rec")}/>
    //   {
    //     recommendedProducts &&
    //     recommendedProducts.map((ele)=>{
    //       return(
    //         <div>
    //           <h1>{ele.title}</h1>
    //           <p>{ele.description}</p>
    //           <img src={ele.image} alt='no img'></img>
    //           <p>{ele.platform}</p>
    //         </div>
            
    //       )
    //     })
    //   }
    //   <button>submit</button>
    //   </form>
    // </div>
    <div className="container mt-5">
      {/* <Button variant="contained">Hello world</Button> */}
      {/* <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="mb-3">
          <label htmlFor="rec" className="form-label">Product Recommendation</label>
          <input {...register("rec")} type="text" className="form-control fixed" id="rec" />
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form> */}

      <div className="row mt-4">
        <h1>Recommended Products</h1>
        {props.data.map((ele, index) => (
          <div key={index} className="col-md-4 mb-4 p-5">
            <div className="card">
              <img src={ele.image} className="card-img-top" alt="Product" />
              <div className="card-body">
                <h5 className="card-title">{ele.title}</h5>
                <p className="card-text">{ele.description}</p>
                <p className="card-text">Platform: {ele.platform}</p>
                <p className="card-text">Price: {ele.price}</p>
                {/* <p className="card-text">description: {ele.description}</p> */}

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Recommend