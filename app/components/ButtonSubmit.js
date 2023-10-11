"use client";

/*useFormStatus hook provides information about the status of form submissions or actions. 
Specifically, it returns an object with properties that you can access.
One of the properties in the returned object is likely named pending. This property is a boolean value that is true 
when a form submission or action is in progress, and false when there are no pending submissions or actions. */
import { experimental_useFormStatus as useFormStatus } from "react-dom";

//the ...props spread operator is used to pass any additional props to the underlying button element.
const ButtonSubmit = ({ value, ...props }) => {
  /*By using object destructuring {}, you are extracting the pending property from the object returned 
    by useFormStatus() and creating a variable named pending with the value of the pending property.*/
  const { pending } = useFormStatus();
  return (
    //the button is disabled when pending is true.
    <button disabled={pending} {...props}>
      {pending ? "Loading..." : value}
    </button>
  );
};

export default ButtonSubmit;
