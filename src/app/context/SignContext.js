'use client'
import React, { createContext, useState } from 'react'
export const SignupContext = createContext()
export default function SignupContextProvider(props) {
    const [user,setUser] = useState({
        username:'',
        email:'',
        password:'',
      })
      const [buttonDisabled,setbuttonDisabled] = useState(false)
      const [email,setEmail] = useState('')

  return (

    <SignupContext.Provider value={{buttonDisabled,setbuttonDisabled,user,setUser,email,setEmail}}  >
{props.children}
    </SignupContext.Provider>

  )
}

