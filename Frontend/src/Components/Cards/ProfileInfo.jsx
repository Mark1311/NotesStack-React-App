import React from 'react'
import {getInitials} from "../../Utils/helper";

const ProfileInfo = ({userInfo, onLogout}) => {
  return (
    <>
    <div className='flex items-center gap-3'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-400'>
        {getInitials(userInfo?.fullName)}
        </div>
        <div>
            <p className='text-sm font-medium'>{userInfo?.fullName}</p>
            <button className='text-sm text-slate-500 underline' onClick={onLogout}>LogOut</button>
        </div>

    </div>
    </>
  )
}

export default ProfileInfo