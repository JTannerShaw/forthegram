import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { addPost } from "../../store/posts";
import { useDispatch } from "react-redux";

const UploadPicture = ({ setShowModal }) => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [caption, setCaption] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("caption", caption)

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const data = await dispatch(addPost(formData))
        if (data) {
            setImageLoading(false);
            setShowModal(false);
            // console.log("error");
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        <div className='form-wrapper'>
            <h1>Create a Post</h1>
            <form className='post-modal-form' onSubmit={handleSubmit}>
                <input
                    className='upload-image-div'
                    type="file"
                    accept="image/*"
                    onChange={updateImage}
                />
                <textarea required={true} className='post-textarea' rows='7' cols='40' value={caption} onChange={(e) => setCaption(e.target.value)} />
                <button className='post-modal-submit' type="submit">Submit</button>
                {(imageLoading) && <p>Loading...</p>}
            </form>
        </div>
    )
}

export default UploadPicture;
