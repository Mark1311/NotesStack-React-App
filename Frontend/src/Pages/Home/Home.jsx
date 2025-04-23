import React from 'react'
import Navbar from '../../Components/NavBar/Navbar'
import NoteCard from '../../Components/Cards/NoteCard'

const Home = () => {    
  return (
    <>
    <Navbar/>
    <div className='container mx-auto'>
        <NoteCard title="Bittu" date = "22 Aug" content= "My Content"/>
    </div>
    </>
  )
}

export default Home