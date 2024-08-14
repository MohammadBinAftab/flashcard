
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './flashcard.css';



function Flashcard() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  

  const reportProblem = () => {
    navigate('/report');  // Navigate to the report page
  };

  const currentCard = flashcards[currentIndex];


  return (
    <div className="flashcard-container">
      {flashcards.length > 0 ? (
        <>
          <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={flipCard}>
            {isFlipped ? currentCard.answer : currentCard.question}
          </div>

          <div className="navigation-buttons">
            <button onClick={prevCard}>Previous</button>
            <button onClick={nextCard}>Next</button>
          </div>
        </>
      ) : (
        <p>Loading flashcards...</p>
      )}

      <button onClick={reportProblem} className="report-button">
        Report a Problem
      </button>

   
    </div>
  );
}

export default Flashcard;
