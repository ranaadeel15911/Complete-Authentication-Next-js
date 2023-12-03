"use client";
import axios from "axios";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";


export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const [email, setEmail] = useState("nothing")
    const [username, setUsername] = useState("nothing")
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
        setEmail(res.data.data.email)
        setUsername(res.data.data.username)
    }
    // async function abc (){
    //     const res = await axios.get('/api/users/me')
    //     console.log(res.data);
    //     setData(res.data.data._id)
    //     setEmail(res.data.data.email)
    //     setUsername(res.data.data.username)
      
    // }
useEffect(() => {
  getUserDetails()
}, [])


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p><br />
            <h4>You can click below ↓</h4>
            <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2><br />
            <h2 className="p-1 rounded bg-green-500">{email}</h2><br />
            <h2 className="p-1 rounded bg-green-500">{username}</h2>
        <hr />
        <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Logout</button>

        <button
        onClick={getUserDetails}
        className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >GetUser Details</button>


            </div>
    )
}