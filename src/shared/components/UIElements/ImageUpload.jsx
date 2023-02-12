import React ,{ useRef,useEffect , useState}from 'react'
 import "./ImageUpload.css"
 import Input from '../Button/Input'
import Button from '../Button/Button'
import "../Button/Input.css"
export default function ImageUpload(props) {

     let filePickerRef = useRef()
     const [isValid,setisValid] = useState(false)
     const [previewUrl , setpreviewUrl] = useState()
     const [file , setfile] = useState()
       
     const pickHandler = e=>{
      
   
      let pickedFile;
      let isValidvalue = isValid;
      if(e.target.files && e.target.files.length === 1)
       {
         pickedFile = e.target.files[0];
        setfile(pickedFile)
        setisValid(true)
        isValidvalue = true;
         
       }else{
        setisValid(false)
        isValidvalue = false;
       }
       
       props.onInput(props.id , pickedFile , isValidvalue)
     }


    const pickImagehandler = ()=>{
            filePickerRef.current.click()
    }

  useEffect(()=>{
     if(!file) return 
     const fileReader =  new FileReader()
     fileReader.readAsDataURL(file)
     fileReader.onload = ()=>{
      setpreviewUrl(fileReader.result)
     }
  },[file])


  return (
     <div className="form-control">
      <input 
      ref={filePickerRef} 
      type="file"
      id={props.id} 
      style={{display:"none"}} 
      accept=".jpg,.jpeg,.png"
      onChange={pickHandler}
       />
      <div className={`image-upload ${props.center && "center"}`}>
          <div className='image-upload__preview'>
          { previewUrl && <img src={previewUrl} alt="preview" />}
          { !previewUrl &&  <p>Please select an Image</p>}

          </div>
           <Button type="button" onClick={pickImagehandler} >PICK IMAGE</Button>
      </div>
      {!isValid && <p>{ props.errorText}</p>}
     </div>

  )
}
