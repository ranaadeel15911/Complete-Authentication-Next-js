"use client"

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function ResetPasswordPage() {
    const [token,setToken] = useState("")
    const [verified,setVerified] = useState(false)
    const [error,setError] = useState(false)
    const [password,setPassword] = useState('')
    const [username,setUsername] = useState('')
    const [id,setId]=useState('')
    const route = useRouter()
    const userVerifyEmail =async ()=>{
try {
    /* Keep in mind that send data in object form if you wants to send through body we sent data without curly braces in signup to
    user because that was already a object  */
    const response= await axios.post('/api/users/resetpassword',{token})
    /* here it means the token which we got will go to verifyEmail route.ts and in it this token will be match with the token
    which we stored in database and  in axios we send body like this axios.post('/api/users/verifyEmail',{token})
    like in fetch we send another way 
    
    let data = await fetch('http://localhost:3000/api/prducts/'+productid,{
    method:"PUT",
    body:JSON.stringify({name,age,price,email})
  },{ cache: 'no-cache' })  */

    setVerified(true)
    console.log(response)
    const passwor = await response.data.data.password 
    setPassword(passwor)
const usernam = await response.data.data.username
    setUsername(usernam)
    const id = await response.data.data._id
    setId(id)
} catch (error:any) {
    setError(true)
    console.log(error.response.data)
}
    }
    useEffect(() => {
      const urlToken = window.location.search.split("=")[1];
      console.log(urlToken)
      /* window.location.search get the location or param in address bar after ? this query if we are giving data through query we can
      get by this  search js on google and in google console write window.location.search you will get it */
      /* You will get this type of address 'q?=js&rlz=1C1VDKB_en-GBPK1069PK1069&oq=js&gs_lcrp=EgZjaHJvbWUqBggAEEUY so
      we split it on to the = and split convert in array and after = there will be 1 index 
      because [(1)q? , (2)js&rlz=1C1VDKB_en-GBPK1069PK1069&oq=js&gs_lcrp=EgZjaHJvbWUqBggAEEUY] */
      setToken(urlToken || "")
      /* because if nothing in query than urlToken will return undefine so below useEffect of token.length>0 will not work 
      so we said add urlToken in setToken if it is undefined than add "" by this token.length will be zero because if nothing 
      to getting length than will return length is 0 */
    }, [])
    
    useEffect(() => {
      
    if (token.length>0) {
        userVerifyEmail()
    }
      
    }, [token])
    /*  */
    const onChangePassword = async()=>{
console.log(password)
try {
    // const nameOfUser = username
    const response = await axios.post('/api/users/changepassword',{id:id,password:password})
    console.log(response)
    toast.success('Your password changed successfully')
    route.push('/profile')

} catch (error:any) {
    setError(true)
    console.log(error.response.data)
}
    }
  return (
    <>
    {!token && 'Invalid Token Found'}
    {verified && (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h2>{token ? `Token Found Successfully Next To Proceed` : "no token"}</h2>
            <h2 style={{fontSize:40}}>Update Your Password</h2>
            <input /* value={password} */ type="text" style={{color:'black'}} className='rounded' placeholder='Type new password here...' onChange={(e)=>setPassword(e.target.value)} />
            <button onClick={onChangePassword} className='rounded' style={{background:'white',color:'black',marginTop:6,paddingLeft:15,paddingRight:15,paddingTop:3,paddingBottom:3}}>New Password </button>
        </div>
    )}
    {
        error && (
            <h2>Error</h2>
        )
    }
    </>
  )
}
