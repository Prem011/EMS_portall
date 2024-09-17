import React from 'react'
import Head from './Head'

const Dashboard = () => {
  return (
    <div className='w-screen h-screen bg-zinc-800' >
      <Head/>

     <div className='h-[80%] w-[99%]' >
       <h1 className='h-full w-full text-white flex justify-center items-center  text-4xl' >Welcome to the Admin Panel</h1>
     </div>



    </div>
  )
}

export default Dashboard
