
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Alert } from 'react-bootstrap';
import DatePicker from "react-datepicker";

// true -> input IS valid
// false -> input is NOT valid
const firstLetterUpper = iText => {
  if (!iText) { return true; }

  if (iText[0].toUpperCase() === iText[0]) {
    return true;
  }

  return false;
  // return iText[0].toUpperCase() === iText[0];
}

const isDateInFuture = date => {
  if (!date) { return false; }
  const today = new Date();
  today.setHours(0,0,0,0);
  // if (date > today) {
  //   return false
  // }

  // return true;

  return !(date > today);
}

const PortfolioForm = ({onSubmit}) => {
  const { register, handleSubmit, errors, setError, clearError, watch, setValue } = useForm();
  const startDate = watch('startDate');
  const endDate = watch('endDate');

  useEffect(() => {
    register({name: 'startDate', type: 'custom'}, {validate: { isDateInFuture }});
    register({name: 'endDate', type: 'custom'}, {validate: { isDateInFuture }});
  }, [])

  // const handleDateChange = (date, dateType) => {
  //   setValue(dateType, date);
  // }

  // const handleDateChange = dateType => date => setValue(dateType, date);
  const handleDateChange = dateType => date => {
    if (!isDateInFuture(date)) {
      setError(dateType, 'isDateInFuture')
    } else {
      clearError(dateType, 'isDateInFuture');
    }
    setValue(dateType, date)
  };


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
      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <div>
          <DatePicker
            showYearDropdown
            selected={startDate}
            onChange={handleDateChange('startDate')}
          />
           { errors.startDate &&
            <Alert variant="danger">
              { errors.startDate?.type === "isDateInFuture" && <p>Please choose present or past date!</p> }
            </Alert>
          }
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="endDate">End Date</label>
        <div>
        <DatePicker
            showYearDropdown
            selected={endDate}
            onChange={handleDateChange('endDate')}
          />
          { errors.endDate &&
            <Alert variant="danger">
              { errors.endDate?.type === "isDateInFuture" && <p>Please choose present or past date!</p> }
            </Alert>
          }
          {/* <DatePicker
            showYearDropdown
            selected={endDate}
            onChange={(date) => handleDateChange(date, 'endDate')}
          /> */}
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-primary">Create
      </button>
    </form>
  )
}

export default PortfolioForm;
