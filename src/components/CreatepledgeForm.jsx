import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import postCreatepledge from "../api/post-createpledge.js";

function CreatepledgeForm() {
  const navigate = useNavigate();
  const { clubid, projectid } = useParams(); // Extract the id from the URL

  const [details, setDetails] = useState({
    amount: "",
    comment: "",
    anonymous: false, // Default to false
    project: projectid,
  });

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [id]: type === "checkbox" ? checked : value, // Update checkbox state correctly
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (details.amount && details.project) {
      postCreatepledge(
        details.amount,
        details.comment,
        details.anonymous,
        details.project
      ).then((response) => {
        console.log(response);
        navigate(0);
      });
    }
  };

  return (
    <form>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          id="amount"
          placeholder="How much are you pledging?"
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Comment:</label>
        <input
          type="text"
          id="comment"
          placeholder="Add a comment"
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="checkbox"
          id="anonymous"
          checked={details.anonymous}
          onChange={handleChange}
        />
        <label for="anonymous" id="checkboxlabel"> Pledge anonymously</label>
      </div>
      <button type="submit" onClick={handleSubmit}>
        Add a pledge
      </button>
    </form>
  );
}

export default CreatepledgeForm;
