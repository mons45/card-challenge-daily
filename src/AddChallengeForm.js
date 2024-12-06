import React, { useState } from "react";
import "./AddChallengeForm.css";

const AddChallengeForm = ({ onAddChallenge }) => {
    const [newChallenge, setNewChallenge] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault(); // Prevent form submission from refreshing the page
      onAddChallenge(newChallenge); // Correct prop name here
      setNewChallenge(""); // Clear input after adding
    };
  
    return (
      <form className="add-challenge-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a new challenge"
          value={newChallenge}
          onChange={(e) => setNewChallenge(e.target.value)}
        />
        <button type="submit">Add Challenge</button>
      </form>
    );
  };
export default AddChallengeForm ;