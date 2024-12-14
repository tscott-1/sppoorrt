import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { useNavigate } from "react-router-dom";

function ContactForm() {
  const navigate = useNavigate();
  const [state, handleSubmit] = useForm("xpwadobo");
  if (state.succeeded) {
      navigate("/");
      return <p>Thanks for your message!</p>;
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">
        Your Email Address
      </label>
      <input
        id="email"
        type="email" 
        name="email"
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
      <label htmlFor="message">
        Your Message
      </label>
      <textarea
        id="message"
        name="message"
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
      <button type="submit" disabled={state.submitting}>
        Submit
      </button>
    </form>
  );
}



export default ContactForm;