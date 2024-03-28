import React, { useEffect, useState } from 'react'
import './ComponentView.css'
const ComponentView = (props) => {
    const [trans,setTrans]=useState("100%")

    const [allTextFieldsTitles,setAllTextFields]=useState([])
    const [allImages,setAllImages]=useState([])


    const colours=["rgba(43, 43, 43, 0.893)","#E87878","#E8E378","#89E878","#78E8D5","#78B0E8","#7D78E8","#C878E8","#E878C6"]


    useEffect(()=>{
        setAllImages(props.allImageTitles)
        setAllTextFields(props.allTextFieldsTitles)
    },[])
    useEffect(()=>{
      // setAllImages(props.allImages)
      setAllTextFields(props.allTextFieldsTitles)
    },[props.allTextFieldsTitles])
    useEffect(()=>{
      setAllImages(props.allImageTitles)
    },[props.allImageTitles])

    useEffect(()=>{
        setAllImages(props.allImageTitles)
        setAllTextFields(props.allTextFieldsTitles)
        if(props.isopen){
            setTrans("0%")
        }
        else{
            setTrans("100%")
        }
    },[props.isopen])
  return (
    <div className='ComponentView-main-container' style={{transform:`translateX(${trans})`}}>
      <i class="fa-solid fa-xmark" onClick={()=>{
        setTrans("100%")
        props.setOpen(false)
      }}></i>

      <div style={{display:"flex",flexDirection:"column"}}>
        <label>TextFields</label>
        <div>
          <div className='inside-line'></div>
          {
            allTextFieldsTitles.map((textField)=>{
              return <label style={{color:(textField.colour!==0)?colours[textField.colour]:"rgb(3, 162, 183)"}}>{textField.title}{textField.x}{textField.y}</label>
            })
          }
        </div>
      </div>

          <div className='divider'></div>

      <div style={{display:"flex",flexDirection:"column"}}>
        <label>ImageFields</label>
        <div>
          <div className='inside-line'></div>
          {
              allImages.map((imageField)=>{
                  return <label style={{color:(imageField.colour!==0)?colours[imageField.colour]:"rgb(3, 162, 183)"}}>{imageField.title}{imageField.x}{imageField.y}</label>
              })
          }
        </div>
      </div>
    </div>
  )
}

export default ComponentView
