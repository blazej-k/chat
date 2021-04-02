import { FC, useEffect, useState } from "react";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/scss/image-gallery.scss";
 
const Slider: FC = () => {

    const [images, setImages] = useState<{original: string}[]>([])

    const getPhoto = async () => {
        const result: {original: string}[] = []
        for(let i = 1; i <= 6; i++){
            await import(`../../assets/img${1}.jpg`).then(res => result.push({original: res.default}))
        }
        setImages(result)
    }

    useEffect(() => {
        //add one when there'll be new photo
        getPhoto()
    }, []) 

    return (
        <div className='slider'>
            {images.length > 0 && 
                <ImageGallery
                    items={images}
                    showFullscreenButton={false}
                    showPlayButton={false}
                    showNav={false}
                    autoPlay={true}
                    showThumbnails={false}
                    slideInterval={4000}
                />
            }
        </div>
    );
} 
 
export default Slider;

