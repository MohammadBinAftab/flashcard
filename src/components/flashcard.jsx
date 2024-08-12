// flashcard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import './flashcard.css';

function Flashcard() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();  // useNavigate hook to handle navigation

  useEffect(() => {
    fetch('http://localhost:5000/flashcards')
      .then((response) => response.json())
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

  const handleSignIn = () => {
    console.log('Username:', username);
    console.log('Password:', password);
    closeModal();
    // Implement your authentication logic here
  };

  

  const reportProblem = () => {
    navigate('/report');  // Navigate to the report page
  };

  return (
    <div className="flashcard-container">
      {flashcards.length > 0 ? (
        <>
          <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={flipCard}>
            {isFlipped ? (
              <div className="flashcard-back">{flashcards[currentIndex].answer}</div>
            ) : (
              <div className="flashcard-front">{flashcards[currentIndex].question}</div>
            )}
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
