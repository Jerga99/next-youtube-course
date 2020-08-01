
import { PageTitle } from 'components/shared';
import { useState } from 'react';
import { useMutate } from "restful-react";

const Upload = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [images, setImages] = useState([]);
  const { mutate: uploadImage, loading, error } = useMutate({
    verb: 'POST',
    path: 'image-upload'
  });

  const handleChange = event => {
    setSelectedImage(event.target.files[0]);
  }

  const handleImageUpload = () => {
    if (!selectedImage) { return; }
    const formData = new FormData();
    formData.append('image', selectedImage);
    uploadImage(formData)
      .then(uploadedImage => {
        setImages([...images, uploadedImage])
      })
      .catch(() => {
        console.log('Error');
      })
  }

  return (
    <>
      <PageTitle text="Image Upload"/>
      <input
        onChange={handleChange}
        accept=".jpg, .png, .jpeg"
        className="fileInput mb-2"
        type="file"
      />
      <div>
        <button
          onClick={handleImageUpload}
          disabled={!selectedImage}
          className="btn btn-primary mb-2">Upload</button>
      </div>
      <div className="row text-center text-lg-left">
        { images.map(image =>
          <div class="col-lg-3 col-md-4 col-6">
            <a key={image.cloudinaryId}  href={image.url} target="_blank" class="d-block mb-4 h-100">
              <img class="img-fluid img-thumbnail" src={image.url} alt="" />
            </a>
          </div>
          )
        }
      </div>
    </>
  )
}

export default Upload;
