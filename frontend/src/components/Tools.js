import React, { useState } from 'react'
import './Tools.css'
const Tools = (props) => {
    const [currOption,setCurrOption] = useState("Home")
    const col="rgb(43, 149, 241)"
    const [curr,setCurr]=useState({
        "Home":"blue",
        "Insert":"transparent"
    })
    function changeColour(op){
        var obj={
            "Home":"transparent",
            "Insert":"transparent"
        }
        if (op==="Home"){
            obj.Home=col
        }
        else{
            obj.Insert=col
        }
        setCurr(obj)
    }
  return (
    <div className='tools-main-container'>
      <div className='tools-top'>
        <label>File Name</label>
        <div className='tools-top-search'>
            <i class="fa-solid fa-magnifying-glass"></i>
            <input placeholder='search for tools, tags of textFields, etc.' type='text'/>
        </div>
        <div className='tools-top-profile'>
            <label>VL</label>
        </div>
      </div>
      <div className='tools-options'>
        <div className='tools-options-left'>
            <label onClick={()=>{

            }}>File</label>
            <label style={{borderColor:curr.Home}} onClick={()=>{
                setCurrOption("Home")
                changeColour("Home")
                }}>Home</label>
            <label style={{borderColor:curr.Insert}} onClick={()=>{
                setCurrOption("Insert")
                changeColour("Insert")
                }}>Insert</label>
            <label onClick={()=>{

            }}>Help</label>
        </div>
        <div className='tools-options-right'>
            <button onClick={()=>{
                props.setOpen(true)
            }}>Component View</button>
            <button>Editing</button>
            <button>Share</button>
        </div>
      </div>
      <div className='tools-options-bottom'>
            {(currOption==="Home")?<div className='home-options'>
                <div>
                    <i class="fa-solid fa-clipboard"></i>
                    <i style={{scale:"0.7"}} class="fa-solid fa-chevron-down"></i>
                </div>
                <div>
                    Some Font
                    <i style={{scale:"0.7"}} class="fa-solid fa-chevron-down"></i>
                </div>
                <div>
                    12
                    <i style={{scale:"0.7"}} class="fa-solid fa-chevron-down"></i>
                </div>
                <div><b>B</b></div>
                <div><i>i</i></div>
                <div><u>U</u></div>
            </div>:
            <div className='insert-options'>
                <div onClick={()=>{
                    props.isTextFieldClicked(true)
                }}
                 >TextField</div>
                <div onClick={()=>{
                    props.isAddImageClicked(true)
                }}>Image</div>
                <div>Table</div>
                <div>drawing</div>
                <div>Link</div>
                <div>Online Video</div>
                <div>page Number</div>
            </div>}
        </div>
    </div>
  )
}

export default Tools
