import React, { FC, memo, useState } from "react";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/scss/image-gallery.scss";
import Loader from "react-loader-spinner";


let images: { original: string, originalAlt: 'slider-image' }[]
const getPhotos = async () => {
    const result: typeof images = []
    for (let i = 1; i <= 6; i++) {
        await import(`../../assets/img${i}.jpg`).then(res => {
            result.push({ original: res.default.toString(), originalAlt: 'slider-image' })
        })
    }
    return result
}

getPhotos().then(res => images = res)

const Slider: FC = () => {

    const [showSlider, setShowSlider] = useState(false)

    return (
        <div className="slider-wrapper" style={{ textAlign: !showSlider ? 'center' : 'start' }}>
            {!showSlider && <Loader type='Watch' color='black' width='40px' />}
            <div className='slider' style={{ opacity: showSlider ? 1 : 0 }}>
                {images && (
                    <ImageGallery
                        items={images && images}
                        showFullscreenButton={false}
                        showPlayButton={false}
                        showNav={false}
                        autoPlay={true}
                        showThumbnails={false}
                        slideInterval={4000}
                        lazyLoad={true}
                        onImageLoad={() => setShowSlider(true)}
                    />
                )}
            </div>
        </div>
    )
};

export default memo(Slider);

