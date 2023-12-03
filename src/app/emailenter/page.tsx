'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { SignupContext } from '../context/SignContext'

export default  function EmailEnter() {
    const route = useRouter()
// const [email,setEmail] = useState('')
const {email,setEmail} = useContext(SignupContext)
const onFindEmail = async()=>{
    console.log(email)
    try {
        const response = await axios.post("/api/users/emailenter",{email});
        toast.success('Verification Link Sent Successfully')
        console.log(response.data)
route.push('/checkinbox')
    } catch (error : any) {
        console.log('Email Finding Failed')
        toast.error(error.message)
      } 
}
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 style={{fontSize:40}}>Find Your Email </h1>
        <p>Enter You email below to find account</p>
        <input type="text" style={{color:'black'}} className='rounded' placeholder='Type email here...' onChange={(e)=>setEmail(e.target.value)} />
        <div className='justify-end items-end'>
        <button onClick={onFindEmail} className='rounded' style={{background:'white',color:'black',marginTop:6,paddingLeft:25,paddingRight:25,paddingTop:3,paddingBottom:3}}>Next </button>
        </div>
</div>
  )
}
