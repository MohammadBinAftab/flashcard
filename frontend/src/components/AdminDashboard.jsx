import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [newCard, setNewCard] = useState({ question: '', answer: '' });
  const [editCard, setEditCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://flashcard-5-1eoe.onrender.com/flashcards', {
      mode: 'cors'
    })
      .then((response) => response.json())
      .then((data) => setFlashcards(data))
      .catch((error) => console.error('Error fetching flashcards:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editCard) {
      setEditCard({ ...editCard, [name]: value });
    } else {
      setNewCard({ ...newCard, [name]: value });
    }
  };

  const addFlashcard = () => {
    fetch('https://flashcard-5-1eoe.onrender.com/flashcards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCard),
    })
      .then((response) => response.json())
      .then((card) => setFlashcards([...flashcards, card]))
      .then(() => setNewCard({ question: '', answer: '' }))
      .catch((error) => console.error('Error adding flashcard:', error));
  };

  const editFlashcard = (id) => {
    setEditCard(flashcards.find((card) => card.id === id));
  };

  const updateFlashcard = () => {
    fetch(`https://flashcard-5-1eoe.onrender.com/flashcards/${editCard.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editCard),
    })
      .then(() => {
        setFlashcards(flashcards.map((card) => (card.id === editCard.id ? editCard : card)));
        setEditCard(null);
      })
      .catch((error) => console.error('Error updating flashcard:', error));
  };

  const deleteFlashcard = (id) => {
    fetch(`https://flashcard-5-1eoe.onrender.com/flashcards/${id}`, {
      method: 'DELETE',
    })
      .then(() => setFlashcards(flashcards.filter((card) => card.id !== id)))
      .catch((error) => console.error('Error deleting flashcard:', error));
  };

  const goToFlashcards = () => {
    navigate('/flashcards');
  };

  return (
    <div style={styles.container}>
      <h2>Admin Dashboard</h2>
      <div style={styles.form}>
        <input
          type="text"
          name="question"
          placeholder="Question"
          value={editCard ? editCard.question : newCard.question}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="text"
          name="answer"
          placeholder="Answer"
          value={editCard ? editCard.answer : newCard.answer}
          onChange={handleInputChange}
          style={styles.input}
        />
        {editCard ? (
          <button onClick={updateFlashcard} style={styles.button}>
            Update Flashcard
          </button>
        ) : (
          <button onClick={addFlashcard} style={styles.button}>
            Add Flashcard
          </button>
        )}
      </div>
      <div style={styles.list}>
        {flashcards.map((card) => (
          <div key={card.id} style={styles.card}>
            <div>
              <strong>Q:</strong> {card.question}
            </div>
            <div>
              <strong>A:</strong> {card.answer}
            </div>
            <button onClick={() => editFlashcard(card.id)} style={styles.button}>
              Edit
            </button>
            <button onClick={() => deleteFlashcard(card.id)} style={styles.button}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <button onClick={goToFlashcards} style={styles.navButton}>
        Go to Flashcards
      </button>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  form: {
    marginBottom: '20px',
  },
  input: {
    marginRight: '10px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#333',
    color: 'white',
    marginTop: '10px',
  },
  list: {
    marginTop: '20px',
  },
  card: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '10px',
    backgroundColor: '#f9f9f9',
  },
};

export default AdminDashboard;
