import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './FileWindow.css'
const FileWindow = (props) => {
    const [isOpen,setIsOpen] = useState(false)
    const [isEditable,setIsEditable]=useState(false)
    const navigate = useNavigate()
  return (
    <div className='fileWindow-main-container' style={{transform:(props.isopen)?"translateX(0%)":"translateX(-110%)"}}>
      <div className='filewindow-left'>
        <div onClick={()=>{
            props.closeWindow()
        }}>
            <i class="fa-solid fa-circle-arrow-left"></i>
            <label>Close</label>
        </div>
        <div onClick={()=>{
            navigate("/")
        }}>
            <i class="fa-solid fa-house"></i>
            <label>Home</label>
        </div>
        <div onClick={()=>{
            setIsEditable(!isEditable)
        }}>
            <i class="fa-solid fa-pen-to-square"></i>
            <label>Rename Document</label>
        </div>
        <div>
            <i class="fa-solid fa-file"></i>   
            <label>New Document</label>
        </div>
        <div>
            <i class="fa-solid fa-folder-open"></i>  
            <label>Open</label>
        </div>
        <div onClick={()=>{
            props.onSave(props.filename)
        }}>
            <i class="fa-solid fa-cloud-arrow-down"></i>
            <label>Save</label>
        </div>
        <div>
            <i class="fa-solid fa-circle-info"></i>
            <label>About</label>
        </div>

      </div>
      <div className='filewindow-right'>
        <div className='filewindow-renamefile'>
            {(isEditable)?
            <input type='text'onKeyDown={ e => {
                if(e.key=== "Enter"){
                    setIsEditable(!isEditable)
                }
                }}  placeholder='fileName' value={props.filename} onChange={e=>{props.changeFileName(e.target.value)}}/>:
            <input type='text' placeholder='fileName' style={{backgroundColor:"rgba(0, 0, 0, 0.426)"}} value={props.filename} onChange={e=>{props.changeFileName(e.target.value)}} disabled/>}
        </div>
      </div>
    </div>
  )
}

export default FileWindow
