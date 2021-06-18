import React, { useEffect } from 'react';
import '../Page.scss';
import HTTP from '../../../../Utils/HTTP';
import './Images.scss';

function Images(props) {
    const [images, setImages] = React.useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        fetchImages(abortController.signal);
        return () => abortController.abort();
    }, []);

    const fetchImages = async (signal) => {
        const response = await HTTP.GET('/api/all-images', signal);
        if (response.success) {
            setImages(response.data);
        }
    }

    const deleteImg = async (img) => {
        console.log(img);
    }

    return (
        <div>
            <h1>Images</h1>
            <div className="gallery">
                {images.map((img, i) => {
                    return <img key={i} alt={img} src={`${HTTP.serverAddr}/uploads/${img}`} onClick={() => deleteImg(img)} />
                })}
            </div>
        </div>
    )
}

export default Images;