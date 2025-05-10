import React from 'react'
import { IoSearch } from "react-icons/io5";
import {IoMdClose} from 'react-icons/io'

const SerachBar = ({value, onChange, handleSerach, onClearSearch}) => {
  return (
    <div className='w-80 flex items-center px-4 bg-slate-300 rounded-md'>
        <input
            type='text'
            placeholder='Serach Notes'
            className='w-full text-xs bg-transparent py-[11px] outline-none'
            value={value}
            onChange={onChange}
        />

        { value && <IoMdClose className='text-xl text-slate-500 cursor-pointer hover:text-black mr-3' onClick={onClearSearch}/>}

        <IoSearch className='text-slate-500 cursor-pointer hover:text-black' onClick={handleSerach}/>
    </div>
  )
}

export default SerachBar