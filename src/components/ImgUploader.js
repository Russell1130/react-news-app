import { useEffect, useState } from 'react'
import './uploader.css'
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'

function ImgUploader(props) {

  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState("No selected file")

  return (
    <div className='self-center'>
      <form
      onClick={() => document.querySelector(".input-field").click()}
      >
        <input type="file" accept='image/*' className='input-field' hidden 
        onChange={({ target: {files}}) => {
          files[0] && setFileName(files[0].name)
          if(files){
            setImage(URL.createObjectURL(files[0]))
            props.onUpload(files[0])
          }
        }}
         />

        {image ?
        <img src={image} width={150} height={150} alt={fileName} />
        : 
        <>
        <MdCloudUpload color='#1475cf' size={60} />
        <p>ADD HERO IMAGE</p>
        </>
      }

      </form>

      <section className='uploaded-row'>
        <AiFillFileImage color='#1475cf' />
        <span className='upload-content'>
          {fileName} - 
          <MdDelete
          onClick={() => {
            setFileName("No selected File")
            props.onUpload(null)
            setImage(null)
          }}
           />
        </span>
      </section>

    </div>
  )
}

export default ImgUploader