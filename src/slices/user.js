import {createSlice} from '@reduxjs/toolkit'
import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

export const userlogin = createAsyncThunk("login", async (userObject,thunkAPI)=>{

    let res = await axios.post("http://localhost:3000/user/login",userObject)
    // console.log(res,userObject)
    let data = res.data;
    let message = data.message

    if(message === "success"){
        
        localStorage.setItem("token",data.token)
       
        return data;
    }
    else{
        return thunkAPI.rejectWithValue(message)
        
    }
})

let userSlice = createSlice({
    name:"users",
    initialState:{
    userData:{},
    success:false,
    isPending:false,
    isFulfiled:false,
    isError:false,
    errorMsg : ""
    },

    reducers:{
        whenLogout :(state)=>{
            state.success = false
            state.userData=null;
            state.isError=false;
            state.errorMsg='';
            return state;
        }

    },
    extraReducers:{
        [userlogin.pending]: (state,action)=>{
                state.isPending = true;
                state.isFulfiled = false;
                state.isError = false;
                state.errorMsg  = ""
        },
        [userlogin.rejected]:(state,action)=>{
                state.isPending = false;
                state.isError = true;
                state.isFulfiled = false
                state.errorMsg = action.payload
               

        },
        [userlogin.fulfilled]: (state,action) =>{
                state.userData = action.payload.user
                state.isPending = false;
                state.isError = false;
                state.isFulfiled = true;
                state.errorMsg = ""
                state.success = true


        }
    }
})

export const {whenLogout} = userSlice.actions 
export default userSlice.reducer