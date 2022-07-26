import React, { useState } from "react";
import { useCart } from "./cartContext";
import { saveShippingAddress } from "./services/shippingService";

/* Has the form been submitted?
Is a submission in process? 
Is the form completed?*/
//State Enum
const STATUS = {
  IDLE: "IDLE",
  SUBMITTED: "SUBMITTED",
  SUBMITTING: "SUBMITTING",
  COMPLETED: "COMPLETED",
}

// Declaring outside component to avoid recreation on each render
const emptyAddress = {
  city: "",
  country: "",
};

export default function Checkout() {
    const {dispatch} = useCart()
    //Stores the checkout form data
    /* Seperate useState calls can be declared but  when data is 
    related prefered a single useState call. */
    const [address, setAddress] = useState(emptyAddress);
    const [status, setStatus] = useState(STATUS.IDLE)
    const [saveError, setSaveError] = useState(null)
    /* Each property on this object will be an ID of a touched field */
    const [touched, setTouched] = useState({})

    //Derived states
    const errors = getErrors(address);
    /* The form is valid if the errors object has no properties. 
    If errors is an empty object, then the form is valid.*/
    const isValid = Object.keys(errors).length === 0;

  /* To update state on change need to reference existing state. So, use
  function form of setState.*/
  function handleChange(e) {
    /* -> With functional set state, React deletes the event before we can access it.
      Solution: Persist the event. 
      -> This isn't necessary in React 17 or newer sunce React 17 no longer pools events.
      */
    e.persist();  //persist the event
    /* -> Set address to current value, but with the field that just changed updated. 
    -> e.target.id Using JavaScript's computed property to reference 
      a property using a variable. Ex: city input id and object name is both city.

    -> Explain: 
      1. Set address to a copy of the current address.
      2. use the input's id to determine which property to set
      (using computed property syntax)
    */
    setAddress((currAddress) => {
      return {
        ...currAddress, [e.target.id]: e.target.value 
      }
    })
  }

  function handleBlur(event) {
    event.persist();
    setTouched((cur) => {
      return {...cur, [event.target.id]: true}
    });
  }

  async function handleSubmit(event) {
    /* When form submitted Prevent form from posting back to the server. 
    In order to handle all validation in client side.*/
    event.preventDefault();
    setStatus(STATUS.SUBMITTING);
    if(isValid){
      try {
        await saveShippingAddress(address);
        dispatch({type: "empty"});
        setStatus(STATUS.COMPLETED);
      } catch (error) {
        setSaveError(error)
      }
    } else {
      setStatus(STATUS.SUBMITTED)
    }
  }

  function getErrors(address){
    const result = {};
    if(!address.city) result.city = "City is required"
    if(!address.country) result.country = "Country is required"
    return result;
  }

  if(saveError) throw saveError;
  /* status state use to display confirmation message and
  hide the form*/
  if(status === STATUS.COMPLETED){
    return <h1>Thanks for shopping.</h1>
  }

  return (
    <>
      <h1>Shipping Info</h1>
      {/* If the form is invalid and submitted, display the errors above the form.*/}
      {!isValid && status === STATUS.SUBMITTED && (
        <div role="alert">
          <p>Please fix the following errors:</p>
          <ul>
            {Object.keys(errors).map((key) => {
              return <li key={key}>{errors[key]}</li>
            })}
          </ul> 
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">City</label>
          <br />
          <input
            id="city"
            type="text"
            value={address.city}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <p role="alert">
            {(touched.city || status === STATUS.SUBMITTED) && errors.city}
          </p>
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <br />
          <select
            id="country"
            value={address.country}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            <option value="China">China</option>
            <option value="India">India</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="USA">USA</option>
          </select>

          <p role="alert">
            {(touched.country || status === STATUS.SUBMITTED) && errors.country}
          </p>
        </div>

        <div>
          <input
            type="submit"
            className="btn btn-primary"
            value="Save Shipping Info"
            disabled={status === STATUS.SUBMITTING}
          />
        </div>
      </form>
    </>
  );
}
