import React from 'react'
import '../search/search.css'
import {useForm} from 'react-hook-form'
import { useState,useEffect } from 'react'
import axios from 'axios'
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




  return (
    <div>
      implementing search
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <input type="text" {...register("searchInput")}/>
      </form>
      

    {
      find 
      ?
      items.map((item,index)=>{
        return(
          <div className="serachItems">
          <h3>{item.title}</h3>
            <p>{item.price}</p>
            <p>{item.stars}</p>
            <p>{item.link}</p>
            <p>{item.price}</p>
            <p>{item.platform}</p>
            <p>{item.type}</p>
            
          </div>
        )

      })
      :
      <h1>no items found</h1>
    }





    </div>
  )
}

export default Search