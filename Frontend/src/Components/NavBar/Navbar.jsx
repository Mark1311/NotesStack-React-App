import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import {useNavigate} from 'react-router-dom'
import SerachBar from '../SerachBar/SerachBar';

const Navbar = () => {

  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate;

  const onLogout = () =>{
    navigate("/login")
  }

  const handleSerach = ()=>{
  };

  const onClearSearch = () =>{
    setSearchQuery("")
  }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
        <h2 className='text-xl font-medium text-black py-2'>Notes</h2>

        <SerachBar
          value={searchQuery}
          onChnage={({target}) =>{
            setSearchQuery(target.value)
          }}
          handleSerach={handleSerach}
          onClearSearch={onClearSearch}
          />

        <ProfileInfo onLogout = {onLogout}/>
    </div>
  )
}

export default Navbar