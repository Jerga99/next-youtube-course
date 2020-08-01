
import { PageTitle } from 'components/shared';
import { useGet } from "restful-react";

const Images = () => {
  const { data: images, loading } = useGet({
    path: "/images",
  });

  const displayImages = () => {
    return images.map(image =>
      <div class="col-lg-3 col-md-4 col-6">
        <a key={image.cloudinaryId}  href={image.url} target="_blank" class="d-block mb-4 h-100">
          <img class="img-fluid img-thumbnail" src={image.url} alt="" />
        </a>
      </div>
      )
  }

  if (loading) {
    return 'Loading..'
  }

  return (
    <>
      <PageTitle text="Images"/>
      <div className="row text-center text-lg-left">
        {
          images ? displayImages() : 'No Images :('
        }
      </div>
    </>
  )
}

export default Images;
