import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UploadPicture from '../UploadImage/UploadImage';
function AddPost() {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button className='answer-button' onClick={() => setShowModal(true)}>+</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UploadPicture setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default AddPost;
