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




  const [brands] = useState(['','hp', 'apple', 'asus', 'samsung', 'omen']);
  const [platforms] = useState(['','amazon', 'flipkart']);
  const [types] = useState(['','laptop', 'phone', 'AC', 'fridge']);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
  const handleBrandChange = (e) => setSelectedBrand(e.target.value);
  const handlePlatformChange = (e) => setSelectedPlatform(e.target.value);
  const handleTypeChange = (e) => setSelectedType(e.target.value);
  const handleMinPriceChange = (e) => setMinPrice(e.target.value);
  const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);
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
        let res = await axios.get(`http://localhost:3000/product/search?keyword=${searchData}&brand=${selectedBrand}&type=${selectedType}&platform=${selectedPlatform}`)
        console.log(res)
        if(res.data.message == "no items found"){
          console.log("data not fodund")
          setFind(false)
        }
        else{
          setItems(res.data.products)
          console.log("nuimber from server is",res.data.productCount)
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
      <div className='search-page'>
    <div className='search-bar'>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <input type="text" {...register("searchInput")} placeholder="Search..."/>
      </form>
    </div>

    <div className='content'>
      <div className='left-panel'>
      <div className='filter'>
            <label>Brand</label>
            <select value={selectedBrand} onChange={handleBrandChange}>
              {brands.map((brand, index) => (
                <option key={index} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
          <div className='filter'>
            <label>Platform</label>
            <select value={selectedPlatform} onChange={handlePlatformChange}>
              {platforms.map((platform, index) => (
                <option key={index} value={platform}>{platform}</option>
              ))}
            </select>
          </div>
          <div className='filter'>
            <label>Type</label>
            <select value={selectedType} onChange={handleTypeChange}>
              {types.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className='filter'>
            <label>Price Range</label>
            <div className="price-range">
              <input type="number" value={minPrice} onChange={handleMinPriceChange} placeholder="Min Price" />
              to
              <input type="number" value={maxPrice} onChange={handleMaxPriceChange} placeholder="Max Price" />
            </div>
          </div>
      </div>

      <div className='right-panel'>
        {rec && <Recommend data={recommendedProducts}/>}

        {find ? (
          <div className='search-results'>
            <h1>Searched Products</h1>
            {items && items.map((item, index) => (
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
            ))}
          </div>
        ) : <h1>No items found</h1>}
      </div>
    </div>
  </div>
      
     





    </div>
  )
}

export default Search