import React from 'react'

export const EmptyCard = ({imgSrc, message}) => {
  return (
    <div className='flex flex-col items-center justify-center mt-20'>
        <img src= {imgSrc} alt="No Image Here" className='w-70  h-70 sm:w-64 sm:h-64 blur-sm'/>

        <p className='w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5'>{message}</p>
    </div>
  )
}


export default EmptyCard;