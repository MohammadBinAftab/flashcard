import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './flashcard.css';

function Flashcard() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://flashcard-5-1eoe.onrender.com/flashcards')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFlashcards(data);
        } else {
          console.error('Invalid data format or empty data');
        }
      })
      .catch((error) => console.error('Error fetching flashcards:', error));
  }, []);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false);
  };

  const reportProblem = () => {
    navigate('/report');
  };

  const currentCard = flashcards[currentIndex];

  return (
    <div className="flashcard-container">
      {flashcards.length > 0 ? (
        <>
          <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={flipCard}>
            <div className="flashcard-front">
              {currentCard.question}
            </div>
            <div className="flashcard-back">
              {currentCard.answer}
            </div>
          </div>

          <div className="buttons-container">
            <div className="navigation-buttons">
              <button onClick={prevCard}>
                <span className="material-symbols-outlined">arrow_back_ios</span> Previous
              </button>
              <button onClick={nextCard}>
                <span className="material-symbols-outlined">arrow_forward_ios</span> Next
              </button>
            </div>
            <button onClick={reportProblem} className="report-button">
              <span className="material-symbols-outlined">report_problem</span> Report a Problem
            </button>
          </div>
        </>
      ) : (
        <p>Loading flashcards...</p>
      )}
    </div>
  );
}

export default Flashcard;
