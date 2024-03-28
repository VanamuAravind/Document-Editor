import React, { useEffect, useRef, useState } from 'react'
import './DynamicEditText.css'

const DynamicEditText = (props) => {
    const [val,setVal]=useState("")
    const [x,setX]=useState("10px")
    const [y,setY]=useState("10px")
    const [idx,setIdx]=useState()
    const textAreaRef=useRef(null)
    const continerref=useRef(null)
    useEffect(()=>{
        setY(props.y-160)
        setX(props.x-80)
        setIdx(props.index)
    },[])

    //colour palletes field\
    const [cvis,setCVis]=useState(false)
    const colours=["rgba(43, 43, 43, 0.893)","#E87878","#E8E378","#89E878","#78E8D5","#78B0E8","#7D78E8","#C878E8","#E878C6"]
    const txtcolours=["rgb(134, 134, 134)","#E87878","#E8E378","#89E878","#78E8D5","#78B0E8","#7D78E8","#C878E8","#E878C6"]
    const [currcolour,setColour]=useState(0)

    //edit title field parameters
    const [etdisBool,setETDisBool]=useState(false)
    var ctref=useRef(null)
    //get xpos,ypos,content
    const [title,setTitle]=useState("TextField")

    useEffect(()=>{
        textAreaRef.current.style.height="auto"
        textAreaRef.current.style.height=textAreaRef.current.scrollHeight+"px"
    },[val])

    function handledrag(event){
        setX(Math.max(event.clientX-100,0))
        setY(Math.max(event.clientY-200,0))
    }
    function handledragEnd(event){
        setX(Math.max(event.clientX-100,0))
        setY(Math.max(event.clientY-200,0))
        props.onXChange(Math.max(event.clientX-100,0),idx)
        props.onYChange(Math.max(event.clientY-200,0),idx)
    }
    function getInitialpos(event){
        event.dataTransfer.setDragImage(new Image(), 0, 0);
    }
    function handleEnter(e){
        if (e.key=== "Enter"){
            setETDisBool(!etdisBool)
        }
    }
  return (
    <div className='DynamicEditText-main-container' draggable="true" 
        onDragStart={getInitialpos}
        onDrag={handledrag}
        onDragEnd={handledragEnd}
        style={{
            position:"absolute",
            left:x,
            top:y
        }} ref={continerref}>
      <span style={{backgroundColor:colours[currcolour]}}>
        <label>{title}</label>
        <div>
        <i class="fa-solid fa-trash-can" onClick={()=>{
            props.deleteComptxt(idx)
            }}></i>
        <i class="fa-solid fa-palette" onClick={()=>{
            setCVis(!cvis)
        }}></i>
        {(cvis)?<div className='colour-palletes'>
            {
                colours.map((colour,i)=>{
                    return(
                        <div style={{backgroundColor:colour,
                            width:"20px",
                            height:"20px",
                            borderRadius:"50%"}} onClick={()=>{
                                 setColour(i)
                                 props.onColourChange(i,idx)
                                }}></div>
                    )
                })
            }
        </div>:null}
        <i class="fa-solid fa-pen" onClick={()=>{
            setETDisBool(!etdisBool)
            if(etdisBool){
                ctref.current.focus()
            }
            else{
                ctref=null
            }
            }}></i>
        </div>
        {(etdisBool)?<input ref={ctref} onKeyDown={handleEnter} placeholder="set Title" val={title} onChange={(e)=>{
            setTitle(e.target.value)
            props.onTitleChange(e.target.value,idx)
            }} type='text' className='DynamicEditText-edit-title-container'></input>:null}
      </span>
      <textarea className='my-textArea' style={{color:txtcolours[currcolour]}} ref={textAreaRef} placeholder='enter your text' 
      onChange={e=>{
        setVal(e.target.value)
        props.onValueChange(e.target.value,idx)
        }} rows="1"/>
    </div>
  )
}

export default DynamicEditText
