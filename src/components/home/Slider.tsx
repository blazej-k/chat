import React from 'react'
import { FC, useEffect, useState } from "react";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/scss/image-gallery.scss";

const Slider: FC = () => {

    const [images, setImages] = useState<{ original: string }[]>([])

    const getPhoto = async () => {
        const result: { original: string, originalAlt: string }[] = []
        //add one to 6 when there'll be new photo
        for (let i = 1; i <= 6; i++) {
            await import(`../../assets/img${i}.jpg`).then(res => {
                result.push({ original: res.default.toString(), originalAlt: 'slider-image' })
            })
        }
        setImages(result)
    }

    useEffect(() => {
        getPhoto()
    }, []) 

    return (
        <div className="slider-wrapper">
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
        </div>
    );
}

export default Slider;

