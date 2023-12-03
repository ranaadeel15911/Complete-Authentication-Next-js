import React from 'react'

export default function page({params}:any) {
    console.log(params.id);
    
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      Here is param  <h1>{params.id}</h1>
</div>
  )
}
