import React, { useEffect } from 'react';
import HTTP from '../../../../Utils/HTTP';
import alertsStore from '../../../../Store/alerts.store';
import './Images.scss';
import '../Page.scss';

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
        const response = await HTTP.DELETE(`/api/remove-img/${img}`);
        if (response.success) {
            fetchImages();
        }

        alertsStore.dispatch({
            type: 'set', newState: {
                text: response.message,
                error: !response.success
            }
        });
    }

    return (
        <div>
            <h1>Images</h1>
            <div className="gallery">
                {
                    images.map((img, i) =>
                        <img key={i} src={`${HTTP.serverAddr}/uploads/${img}`} alt={'image ' + (i + 1)} onClick={() => deleteImg(img)} />)
                }
            </div>
        </div>
    )
}

export default Images;