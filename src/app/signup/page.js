'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { SignupContext } from '../context/SignContext'

// import Toast from '../toast/Toast'

export default function Signup() {
  const router = useRouter()
  // const [user,setUser] = useState({
  //   username:'',
  //   email:'',
  //   password:'',
  // })
  // const [buttonDisabled,setbuttonDisabled] = useState(false)
  const {buttonDisabled,setbuttonDisabled} = useContext(SignupContext)
  const {user,setUser} = useContext(SignupContext)
  useEffect(() => {  
    if (user.email.length > 0 && user.username.length > 0 &&  user.password.length > 0) {
     setbuttonDisabled(false) 
    }
    else{
      setbuttonDisabled(true)
    }
  }, [user])
  const [loading,setLoading] = useState(false)
  const [imgFile,uploading] = useState('')
      const imgFileHandler = (e)=>{
        console.log(e.target.files[0])
        if (e.target.files.length !==0) {
          uploading(URL.createObjectURL(e.target.files[0]))
          /* Actually URL.createObjectURL creates url of object on which it is created means it create address or url of selected object */
        }
      }
  const onSignup = async() =>{
    console.log(user.email,user.password,user.username)
    
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup",user);
      // toast('New User Created Successfully', {
      //   icon: '✅',
      // });
      /* below is toast */
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src={imgFile}
                  alt=""
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {user.username}
                </p>
                <p className="mt-1 text-sm  text-indigo-600">
                 New User Created Successfully
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-black hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ))
            console.log("Success true",response.data)
      router.push('/checkinbox')
    } catch (error ) {
      console.log('Signup Failed')
      toast.error(error.message)
      console.log(error.message.include())
    } finally{
      setLoading(false)
    }
  }

  // function imgFileHandler(event: ChangeEvent<HTMLInputElement>): void {
  //   throw new Error('Function not implemented.')
  // }

  return (
    <>
    {/* <Toast/> */}
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className='text-center text-white text-2xl'>
          {loading ? 'Processing' : 'Sign up'}
          </h1>
          <label htmlFor="username">Username</label>
          <input value={user.username} style={{color:'black'}} type="text" id='username' placeholder='type name here...' onChange={(e)=>setUser({...user,username:e.target.value})} />
          <label htmlFor="email">Email</label>
          <input value={user.email} style={{color:'black'}} type="email" id='email' placeholder='type email here...' onChange={(e)=>setUser({...user,email:e.target.value})}/>
          <label htmlFor="password">Password</label>
          <input value={user.password} style={{color:'black'}} type="password" id='password' placeholder='type password here...' onChange={(e)=>setUser({...user,password:e.target.value})}/>
          <label htmlFor="image">Choose Image</label>
          <input style={{marginLeft:120}} type="file" id='image' onChange={imgFileHandler}/>
        <button onClick={onSignup} style={{margin:6,paddingLeft:6,paddingRight:6,background:'white',color:'black' }} className='rounded'>{buttonDisabled ? 'No Signup' : 'Sign up'}</button>
        <Link href={'/login'} style={{background:'white',color:'black',padding:3}} className='rounded'>Login Link</Link>
        </div>
    </>
  )
}
