import React from 'react';
import { useState } from 'react';
import { storage, db } from '../../config/firebase';
import { getDownloadURL, ref, uploadBytes,  } from 'firebase/storage';
import { ref as refren, push } from 'firebase/database';
import './Upload.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Upload() {

    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedImageNames, setSelectedImageNames] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleImageUpload = (e) => {
        const files = e.target.files;
        const updatedSelectedImages = [];
        const updatedSelectedImageNames = [];
    
        for (let i = 0; i < files.length; i++) {
          updatedSelectedImages.push(files[i]);
          updatedSelectedImageNames.push(files[i].name);
        }
    
        setSelectedImages(updatedSelectedImages);
        setSelectedImageNames(updatedSelectedImageNames);
      };


    const handleUpload = async () =>{
        setIsLoading(true);
        if (selectedImages.length > 0){
            for (let i = 0; i < selectedImages.length; i++){
                const image = selectedImages[i];
                const imageRef = ref(storage, image.name);

                try {
                    const snapshot = await uploadBytes(imageRef, image);
                    const downloadUrl= await getDownloadURL(snapshot.ref);

                    const imagesRef = refren(db, 'images');
                    push(imagesRef, {imageUrl:downloadUrl, timestamp: new Date().getTime()});
                     toast.success('image uploaded', {
                position: 'top-center',
                autoClose: 3000,
                theme: 'dark',
              });
                    setIsLoading(false);
                }catch(e){
                    setIsLoading(false);
                    console.log('error uploading image:', e)
                }
            }
        }else {
            console.error('No images selected');
            setIsLoading(false);
        }
    }
  return (
    <div className='main-container'>
      <div>
      <label htmlFor="upload-input" className="custom-upload">
        Choose Images
        <input id="upload-input" type="file" multiple onChange={handleImageUpload} className="upload-input" />
      </label>
      </div>
      <div className="selected-images">
        {selectedImageNames.map((imageName) => (
            <div>
                {
                    isLoading ? (<p></p>) : (<p className='p-tag' key={imageName}>{imageName}</p>)
                }
            </div>
          
        ))}
      </div>
      <button onClick={handleUpload} className='upload-button'>{isLoading ? 'uploading' : 'upload image'}</button>
    </div>
  )
}

export default Upload
