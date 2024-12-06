import React, { useState, useEffect } from "react";
import ChallengeCard from "./ChallengeCard";
import AddChallengeForm from "./AddChallengeForm";
import "./App.css";

const App = () => {
  const [challenges, setChallenges] = useState([]);
  const [currentChallenge, setCurrentChallenge] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // Timer in seconds (5 minutes)
  const [completedChallenges, setCompletedChallenges] = useState([]);

  // Load challenges and completed challenges from local storage or JSON on initialization
  useEffect(() => {
    // Load challenges
    const storedChallenges = localStorage.getItem("challenges");
    if (storedChallenges) {
      setChallenges(JSON.parse(storedChallenges));
    } else {
      // If no challenges in local storage, fetch from JSON
      fetch("/challenges.json")
        .then((response) => response.json())
        .then((data) => {
          setChallenges(data);
          localStorage.setItem("challenges", JSON.stringify(data));
        })
        .catch((error) => console.error("Error loading challenges:", error));
    }

    // Load completed challenges
    const storedCompleted = localStorage.getItem("completedChallenges");
    if (storedCompleted) {
      setCompletedChallenges(JSON.parse(storedCompleted));
    }
  }, []);

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer); // Clear timer on unmount
  }, []);

  // Generate a new challenge if the timer hits 0
  useEffect(() => {
    if (timeLeft === 0) {
      generateNewChallenge(challenges);
    }
  }, [timeLeft, challenges]);

  // Generate a random challenge
  const generateNewChallenge = (challengesList = challenges) => {
    if (!challengesList || challengesList.length === 0) {
      setCurrentChallenge("No challenges available! Add one!");
      return;
    }

    const randomIndex = Math.floor(Math.random() * challengesList.length);
    setCurrentChallenge(challengesList[randomIndex]);
    setTimeLeft(300); // Reset timer to 5 minutes
  };

  // Mark the current challenge as complete and save to local storage
  const completeChallenge = () => {
    const newCompleted = [
      ...completedChallenges,
      { text: currentChallenge, date: new Date().toLocaleDateString() },
    ];
    setCompletedChallenges(newCompleted);
    localStorage.setItem("completedChallenges", JSON.stringify(newCompleted)); // Save to local storage
    generateNewChallenge(challenges);
  };

  // Add a new challenge and save to local storage
  const addChallenge = (newChallenge) => {
    if (newChallenge.trim() === "") return; // Ignore empty challenges

    const updatedChallenges = [...challenges, newChallenge];
    setChallenges(updatedChallenges);
    localStorage.setItem("challenges", JSON.stringify(updatedChallenges)); // Save to local storage
  };

  return (
    <div className="app">
      <h1>Daily Challenge Timer</h1>

      {/* Challenge Card */}
      <ChallengeCard
        challenge={currentChallenge}
        timeLeft={timeLeft}
        onComplete={completeChallenge}
        onNewChallenge={() => generateNewChallenge(challenges)}
      />

      {/* Add New Challenge Form */}
      <AddChallengeForm onAddChallenge={addChallenge} />

      {/* Completed Challenges */}
      <h2>Completed Challenges</h2>
      <ul className="completed-challenges">
        {completedChallenges.map((challenge, index) => (
          <li key={index}>
            {challenge.text} <span>{challenge.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
