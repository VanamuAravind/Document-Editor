import React, { useEffect, useRef, useState } from 'react'
import some from '../some.png'
import './ImageComp.css'
const ImageComp = (props) => {

    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);
    const [idx,setIdx]=useState()
    const handleIconClick = () => {
        fileInputRef.current.click(); // Programmatically trigger a click event on the hidden file input
      };
    // Function to handle file input change
    function handleFileInputChange(e) {
        const file = e.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            setImage(e.target.result);
            props.onImageChange(e.target.result,idx)
        };
        reader.readAsDataURL(file);
        }
    }
    useEffect(()=>{
        setImage(some)
        setIdx(props.index)
    },[])


    const [val,setVal]=useState("")
    const [x,setX]=useState("10px")
    const [y,setY]=useState("10px")
    // const textAreaRef=useRef(null)
    const continerref=useRef(null)
    useEffect(()=>{
        setY(Math.max(props.y-160,0))
        setX(props.x-80)
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
    const [title,setTitle]=useState("ImageField")

    // useEffect(()=>{
    //     textAreaRef.current.style.height="auto"
    //     textAreaRef.current.style.height=textAreaRef.current.scrollHeight+"px"
    // },[val])

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
    <div className='DynamicEditText-main-container' draggable="true"  onFocus={()=>{}}
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
        <input
        type="file"
        accept="image/*" // Specify accepted file types if needed
        ref={fileInputRef} // Reference to the hidden file input
        style={{ display: 'none' }} // Hide the file input
        onChange={handleFileInputChange} // Handle file input change
        />
        <i class="fa-solid fa-trash-can" onClick={()=>{
            props.deleteComp(idx)
            }}></i>
        <i class="fa-solid fa-cloud-arrow-up" onClick={handleIconClick}></i>
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
        {(etdisBool)?<input ref={ctref} onKeyDown={handleEnter} placeholder="set Title" val={title} 
        onChange={(e)=>{
            setTitle(e.target.value)
            props.onTitleChange(e.target.value,idx)
            }} type='text' className='DynamicEditText-edit-title-container'></input>:null}
      </span>
        <div className='image-comp-img-container'>
            <img src={image}/>
        </div>
    </div>
  )
}

export default ImageComp
