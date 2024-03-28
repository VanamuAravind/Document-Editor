import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
const Home = () => {
  const navigate=useNavigate()
  const l=[1,2,3,4,5,6,7,8,9,2,3,4,5,6,7,8,]
  const [logout,setLogout]=useState(false)
  function deleteToken(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.reload()
  }
  function goToNewDocument(){
    navigate("/documentEditor")
  }
  return (
    <div className='home-main-container'>
      <div className='profile-container'>
        <i onClick={()=>setLogout(!logout)} class="fa-solid fa-right-from-bracket"></i>
        <i class="fa-regular fa-user"></i>
      </div>
      {(logout)?<div className='profile-container logout-prompt'>
        <i onClick={()=>setLogout(false)} class="fa-solid fa-xmark"></i>
        <i onClick={deleteToken} class="fa-solid fa-check"></i>
      </div>:null}
      <div className='animated-text-container'>
        <label className='animated-text'>Let's Start</label>
        <label className='animated-text'>Our Journey</label>
        <div className='blank-document-view' onClick={goToNewDocument}>
          <i class="fa-solid fa-plus"></i>
          <label>new document</label>
        </div>
      </div>
      <div className='saved-documents'>
        <span>Saved documents</span>
        <div className='span-divider'></div>
          <div className='all-documents-scroll-container'>
            {
              l.map(i=>{
                return (
                  <div className='document'>
                    <label> <i class="fa-solid fa-clock-rotate-left"></i> Untitled1</label>
                    <label>date : 3/27/2024</label>
                  </div>
                )
              })
            }
          </div>
      </div>
      <div class="gradient"></div>
    </div>
  )
}

export default Home
