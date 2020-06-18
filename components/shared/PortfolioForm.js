
import { useForm } from "react-hook-form";
import { Alert } from 'react-bootstrap';

// true -> input is valid
// false -> input is NOT valid
const firstLetterUpper = iText => {
  if (!iText) { return true; }

  if (iText[0].toUpperCase() === iText[0]) {
    return true;
  }

  return false;
  // return iText[0].toUpperCase() === iText[0];
}

const PortfolioForm = ({onSubmit}) => {
  const { register, handleSubmit, errors } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          ref={register({required: true, maxLength: 30, validate: { firstLetterUpper }})}
          name="title"
          type="text"
          className="form-control"
          id="title"/>
          { errors.title &&
            <Alert variant="danger">
              { errors.title?.type === "required" && <p>Title is required</p> }
              { errors.title?.type === "maxLength" && <p>Max length of title is 30 characters!</p> }
              { errors.title?.type === "firstLetterUpper" && <p>First letter should be uppercased!</p> }
            </Alert>
          }
      </div>

      <div className="form-group">
        <label htmlFor="city">Company</label>
        <input
          ref={register({required: true, minLength: 5})}
          name="company"
          type="text"
          className="form-control"
          id="company"/>
          { errors.company &&
            <Alert variant="danger">
              { errors.company?.type === "required" && <p>Company is required</p> }
              { errors.company?.type === "minLength" && <p>Min length of title is 5 characters!</p> }
            </Alert>
          }
      </div>

      <div className="form-group">
        <label htmlFor="city">Company Website</label>
        <input
          ref={register({required: true, pattern: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/})}
          name="companyWebsite"
          type="text"
          className="form-control"
          id="companyWebsite"/>
          { errors.companyWebsite &&
            <Alert variant="danger">
              { errors.companyWebsite?.type === "required" && <p>Website is required</p> }
              { errors.companyWebsite?.type === "pattern" && <p>Enter a valid url!</p> }
            </Alert>
          }
      </div>

      <div className="form-group">
        <label htmlFor="street">Location</label>
        <input
          ref={register({required: true})}
          name="location"
          type="text"
          className="form-control"
          id="location"/>
          { errors.location &&
            <Alert variant="danger">
              Some Error
            </Alert>
          }
      </div>

      <div className="form-group">
        <label htmlFor="street">Job Title</label>
        <input
          ref={register({required: true})}
          name="jobTitle"
          type="text"
          className="form-control"
          id="jobTitle"/>
          { errors.jobTitle &&
            <Alert variant="danger">
              { errors.jobTitle?.type === "required" && <p>Job title is required</p> }
            </Alert>
          }
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          ref={register({required: true})}
          name="description"
          rows="5"
          type="text"
          className="form-control"
          id="description">
        </textarea>
        { errors.description &&
          <Alert variant="danger">
            { errors.description?.type === "required" && <p>Description is required</p> }
          </Alert>
        }
      </div>
      <button
        type="submit"
        className="btn btn-primary">Create
      </button>
    </form>
  )
}

export default PortfolioForm;
