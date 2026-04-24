import React from 'react'
import { FaRegBell } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
export default function Navbar() {
  return (
    <div className='flex justify-between p-4'>
  <div className="flex gap-20 m-0 p-0">
        <div className="">
          <h1 className='font-bold text-[#064E3B] text-3xl'>TrustLayer</h1>
        </div>

    <div className="flex  justify-center items-center gap-10 text-xl">
      <div className="">
        <h1 className='text-[#064E3B]  border-b-2  border-[#064E3B]'>Marketplace</h1>
      </div>
      <div className="">
        <h1>Resources</h1>
      </div>
      <div className="">
        <h1>Help</h1>
      </div>
    </div>
    <div className="">
      
    </div>
  </div>
      <div className="flex gap-10">
    <div className="">
      <FaRegBell size={30}/>
    </div>
    <div className="">
    <FaWallet size={30}/>
    </div>
    <div className=" bg-[#064E3B] p-2 text-white  rounded-xl">
      Create Escrow 
    </div>
      </div>
    </div>
  )
}
