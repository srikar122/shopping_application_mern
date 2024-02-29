import React from 'react'
import '../search/search.css'
import {useForm} from 'react-hook-form'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {useNavigate} from 'react-router-dom'
import Recommend from '../recommend/Recommend'



function Search() {
  let [searchData, setSearchData] = useState("")
  let [flag,setFlag] = useState(false)
  let [items,setItems] = useState([])
  let {register, handleSubmit, formState:{errors}} = useForm()
  let [find,setFind] = useState(false)

  //form submission
  let onFormSubmit = (obj)=>{
    setFlag(true)
    setSearchData(obj.searchInput)

  }


  //searching logic
  useEffect(()=>{
    // console.log("in useEffect block")
    if(flag == true){
      let call = async()=>{
        console.log("serach string is",searchData)
        let res = await axios.get(`http://localhost:3000/product/search/${searchData}`)
        console.log(res)
        if(res.data.message == "no items found"){
          console.log("data not fodund")
          setFind(false)
        }
        else{
          setItems(res.data.payload)
          console.log("data from server is",res.data.payload)
          setFind(true)
          console.log("data found")
        }
        setFlag(false)
      }

      
      call()
    }
  },[flag])


  // let navigate = useNavigate()
  let [rec,setRec] = useState(false)
  let [pro,setPro] = useState("")

  let recommend = (title)=>{
    console.log(title)
    console.log("done")
    setRec(true)
    setPro(title)
    console.log(rec,pro)
    
  }
  let [recommendedProducts,setRecommendedProducts] = useState([])

  useEffect(() => {
    if (rec) {
      let fun = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:5000/recommend/${pro}`);
          console.log(response.data.recommended_products)
          setRecommendedProducts(response.data.recommended_products);
        } catch (error) {
          console.error('Error fetching recommendations:', error);
        }
      };
      // Call the function here
      fun();
    }
  }, [rec, pro]);
  useEffect(()=>{
    if(pro.length != 0){
        console.log(pro)

    }
  },[pro,rec])
  

  return (
    <div className='search-container'>
      implementing search
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <input type="text" {...register("searchInput")}/>
      </form>
      {rec &&
      // <h1>recommending</h1>
      <Recommend data = {recommendedProducts}/>

      }

    {
      find 
      ?
      <div className='mapper-div'>
        <h1> searched products</h1>
        <br></br>
        {
             items.map((item,index)=>{
              return(
                // <div className="serachItems">
                // <h3>{item.title}</h3>
                //   <p>{item.description}</p>
                //   <p>{item.stars}</p>
                //   <p>{item.link}</p>
                //   <p>{item.price}</p>
                //   <p>{item.platform}</p>
                //   <p>{item.type}</p>
                  
                // </div>
                <Card sx={{ maxWidth: 345 }} style={{'padding' : '20px', 'margin' : '20px 40px', 'max-height' : '600px'}}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt="green iguana"
                className='card-img'
                style={{'height' : '250px'}}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.price}
                </Typography>
             
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={()=>{
                setPro(item.title)
                setRec(true)
                return recommend(item.title)
                }} >
                recommend
              </Button>
            </CardActions>
          </Card>
              )
      
            })
        }
      </div>
     
      :
      <h1>no items found</h1>
    }





    </div>
  )
}

export default Search