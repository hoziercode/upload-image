import React from 'react';
import { db } from '../../config/firebase';
import { ref, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import './Display.css';


function Display() {

    const [imageUrls, setImageUrl ] = useState([]);

    useEffect(() => {
        const imagesRef = ref(db, 'images');
        const imagesListener = onValue(imagesRef, (snapshot) => {
            const data = snapshot.val();

            if (data) {
                const urls = Object.values(data).map((item) => item.imageUrl);
                setImageUrl(urls);
            }
        });

        return () => {
            imagesListener();
        }
    }, [])
  return (
    <div className='display-img'>
      <div className='flex'>
        {
            imageUrls.map((image, index) => {
                return (
                    <div className='imgage-con'>
                        <img src={image} alt="img" key={index} />
                    </div>
                );
            })
        }
      </div>
    </div>
  )
}

export default Display
