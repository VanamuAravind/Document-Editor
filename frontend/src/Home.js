import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Home.css'
const Home = () => {
  const navigate=useNavigate()
  const l=[1,2,3,4,5,6,7,8,9,2,3,4,5,6,7,8,]
  const [logout,setLogout]=useState(false)
  const [recentDocs,setRecentDocs]=useState([])


  useEffect(()=>{
    const user_id=localStorage.getItem("user")
    axios.post("http://localhost:7000/api/getdocuments",{user_id:user_id})
    .then(res=>{
      const curr=res.data
      console.log(curr) 
      var docs=new Set()
      for(let i=0;i<curr.length;i++){
        const filename=curr[i].fileName
        const date=curr[i].date
        if(!docs.has(filename))
        {
          docs.add(filename)
          const obj={
            "filename":filename,
            "date":date
          }
          setRecentDocs(prev=>[...prev,obj])
        }
      }
      console.log(recentDocs)
    })
    .catch(error=>{
      console.log(error)
    })
  },[])

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
              recentDocs.map((data,i)=>{
                return (i<recentDocs.length/2)? (
                  <div className='document'>
                    <label> <i class="fa-solid fa-clock-rotate-left"></i> {data.filename}</label>
                    <label>date : {data.date}</label>
                  </div>
                ):null
              })
            }
          </div>
      </div>
      <div class="gradient"></div>
    </div>
  )
}

export default Home
