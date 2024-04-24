import React,{ useState } from 'react';
import './App.css';
import DynamicEditText from './components/DynamicEditText';
import ImageComp from './components/ImageComp'
import Tools from './components/Tools';
import ComponentView from './components/ComponentView';
import axios from 'axios'

function Main() {
  const [textBool, setTextBool] = useState(false);
  const [imageBool,setImageBools] = useState(false)
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [inCanvas, setInCanvas] = useState(false);
  const [allTextFields, setAllTextFields] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [nextTextFieldId, setNextTextFieldId] = useState(0);
  const [nextImageId, setNextImageId] = useState(0);

  //all textField details (title (title),input text(value),colour(colour),id(id))
  const [textFieldDetails,setTextFieldDetails]=useState([])
  //all imageField details (title,image,colour,id)
  const [imageFieldDetails,setImageFieldDetails]=useState([])


  const [canvasScale,setCanvasScale]=useState(100)

  function isTextFieldClicked(event) {
    setTextBool(event);
  }
  function isAddImageClicked(event){
    setImageBools(event)
  }

  function handleMouseMove(e) {
    setX(e.clientX+2);
    setY(e.clientY+2);
  }
  function handleMouseMoveCanvas(e){
    setX(e.clientX)
    setY(e.clientY)
  }

  function handleCanvasEnter() {
    setInCanvas(true);
  }

  function handleCanvasLeave() {
    setInCanvas(false);
  }

  function deleteCompImg(id) {
    setAllImages((prevImages) => prevImages.filter((image) => image.props.id !== id));
    setImageFieldDetails((prevImages) => prevImages.filter((image) => image.id !== id))
  }
  function deleteCompTxt(id){
    setAllTextFields((prevTextFields)=>prevTextFields.filter((textFeild)=>textFeild.props.id!==id))
    setTextFieldDetails((prevTextFields)=>prevTextFields.filter((textField)=>textField.id!==id))
  }
  

  function txtOnTitleChange(currval, id) {
    setTextFieldDetails((prev) =>
      prev.map((obj) => (obj.id !== id ? obj : { ...obj, title: currval }))
    );
  }
  
  function txtOnValueChange(currval,id){
    setTextFieldDetails((prev) =>
      prev.map((obj) => (obj.id !== id ? obj : { ...obj, value: currval }))
    );
  }
  function txtOnColourChange(currval,id){
    setTextFieldDetails((prev) =>
    prev.map((obj) => (obj.id !== id ? obj : { ...obj, colour: currval }))
  );
  }
  function txtOnXChange(currval,id){
    setTextFieldDetails((prev)=>
    prev.map((obj) => (obj.id!==id) ? obj : {...obj,x:currval})
    )
  }
  function txtOnYChange(currval,id){
    setTextFieldDetails((prev)=>
    prev.map((obj) => (obj.id!==id) ? obj : {...obj,y:currval})
    )
  }


  function imgOnTitleChange(currval,id){
    setImageFieldDetails((prev) =>
      prev.map((obj) => (obj.id !== id ? obj : { ...obj, title: currval }))
    );
  }
  function imgOnImageChange(currval,id){
    setImageFieldDetails((prev) =>
      prev.map((obj) => (obj.id !== id ? obj : { ...obj, src: currval }))
    );
  }
  function imgOnColourChange(currval,id){
    setImageFieldDetails((prev) =>
      prev.map((obj) => (obj.id !== id ? obj : { ...obj, colour: currval }))
    );
  }
  function imgOnXChange(currval,id){
    setImageFieldDetails((prev) =>
      prev.map((obj) => (obj.id !== id ? obj : { ...obj, x: currval }))
    );
  }
  function imgOnYChange(currval,id){
    setImageFieldDetails((prev) =>
      prev.map((obj) => (obj.id !== id ? obj : { ...obj, y: currval }))
    );
  }



  function onSave(filename){
    const fileName=filename
    // const user_id=localStorage.getItem("user")
    const txtFields = textFieldDetails
    const user_id=localStorage.getItem("user")

    try {
      axios.post("http://localhost:7000/api/savedocument",{fileName:fileName,textFields:txtFields,user_id:user_id})
      .then(res=>{
        console.log(res.data)
        alert("file saved successfully")
      })
    } catch (error) {
      console.log("error has occured")
      console.log(error)
    }
  }

  function handleMouseDown(e) {
    if (textBool && inCanvas) {
      const obj = <DynamicEditText onXChange={txtOnXChange} onYChange={txtOnYChange} onColourChange={txtOnColourChange} onValueChange={txtOnValueChange} onTitleChange={txtOnTitleChange} key={nextTextFieldId} id={nextTextFieldId}  deleteComptxt={deleteCompTxt} index={nextTextFieldId} mouseEvent={e} x={x} y={y} />;
      setAllTextFields((prev) => [...prev, obj]);
      setNextTextFieldId((prevId) => prevId + 1);

      const txtobj={
        "title":"TextField",
        "value":"",
        "colour":0,
        "id":nextTextFieldId,
        "x":x,
        "y":y
      }
      setTextFieldDetails((prev)=>[...prev,txtobj])
    }

    if (imageBool && inCanvas) {
      const obj = <ImageComp onXChange={imgOnXChange} onYChange={imgOnYChange} onColourChange={imgOnColourChange} onImageChange={imgOnImageChange} onTitleChange={imgOnTitleChange} key={nextImageId} id={nextImageId} deleteComp={deleteCompImg} index={nextImageId} mouseEvent={e} x={x} y={y} />;
      setAllImages((prev) => [...prev, obj]);
      setNextImageId((prevId) => prevId + 1);

      const imgobj={
        "title":"ImageField",
        "src":"../some.png",
        "colour":0,
        "id":nextImageId,
        "x":x,
        "y":y
      }
      
      setImageFieldDetails((prev)=>[...prev,imgobj])

    }
    setTextBool(false);
    setImageBools(false);
  }

  const [isopen,setIsOpen]=useState(false)
  function setOpen(b){
    setIsOpen(b)
  }

  return (
    <div className="App" onMouseMove={handleMouseMove} onMouseDown={handleMouseDown}>
      {textBool ? (
        <div
          style={{
            opacity: '0.3',
            boxShadow: '0px 0px 10px white',
            left: x,
            top: y,
            position: 'absolute',
            zIndex:"1000"
          }}
        >
          <DynamicEditText />
        </div>
      ) : null}

      {
        imageBool?(
          <div
          style={{
            opacity: '0.3',
            boxShadow: '0px 0px 10px white',
            left: x,
            top: y,
            position: 'absolute',
            zIndex:"1000"
          }}
          >
            <ImageComp/>
          </div>
        ):null
      }

      <Tools onSave={onSave} setOpen={setOpen} isAddImageClicked={isAddImageClicked} isTextFieldClicked={isTextFieldClicked} />
      <ComponentView allImageTitles={imageFieldDetails} allTextFieldsTitles={textFieldDetails} isopen={isopen} setOpen={setOpen}/>
        <div className='zoom-controlls'>
        
        <i class="fa-solid fa-magnifying-glass-plus" onClick={()=>{setCanvasScale(Math.min(canvasScale+10,200))}}></i>
        <i class="fa-solid fa-magnifying-glass-minus" onClick={()=>{setCanvasScale(Math.max(canvasScale-10,50))}}></i>
        </div>
      <div className='Main-Canvas main-canvas-container'>
        <div
          id="main-canvas"
          className="Main-Canvas"
          onMouseEnter={handleCanvasEnter}
          onMouseLeave={handleCanvasLeave}
          onMouseMove={handleMouseMoveCanvas}
          style={{transform:`scale(${canvasScale}%)`}}
        >
          {
            allTextFields.map((textField) => {
              return (
                <div key={textField.props.id}>
                  {React.cloneElement(textField,{deleteCompTxt})}
                </div>
              )
            })
          }
          {
            allImages.map((image) => {
              return (
                <div key={image.props.id}>
                  {React.cloneElement(image, { deleteCompImg })}
                </div>
              );
            })
          }

          
        </div>
      </div>
    </div>
  );
}

export default Main;
