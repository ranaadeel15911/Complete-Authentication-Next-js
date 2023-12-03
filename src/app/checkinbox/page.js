'use client'
import React, { createContext, useContext } from 'react'
import { SignupContext } from '../context/SignContext'

export default function CheckInbox() {
  const {user,setUser} = createContext(SignupContext)
  const {email,setEmail} = useContext(SignupContext)
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 style={{fontSize:140,padding:0,margin:0,display:'inline'}}>📧</h1>
                <h1 style={{fontSize:40,display:'inline'}}>Check Your Inbox</h1>
We have sent You a magical Link on Your Provided Email Account <h1 style={{fontSize:30,display:'inline',color:'red',fontWeight:'bold'}}>{email && email}</h1>

        </div>
  )
}
