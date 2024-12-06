import React from "react";
import "./ChallengeCard.css";

const ChallengeCard = ({ challenge, timeLeft, onComplete, onNewChallenge }) => {
  const getCardStyle = () => {
    if (timeLeft <= 60) return "card red"; // Last 1 minute
    if (timeLeft <= 120) return "card yellow"; // Last 2 minutes
    return "card";
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <>
    <div className={getCardStyle()}>
      <p>{challenge}</p>
    </div>
      <p className="timer">Time Left: {formatTime(timeLeft)}</p>
      <div className="buttons">
        <button onClick={onComplete}>Mark as Done</button>
        <button onClick={onNewChallenge}>Get a New Challenge</button>
      </div>
    </>
  );
};

export default ChallengeCard;
