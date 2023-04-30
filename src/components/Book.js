import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import './Book.css';

function Book({ book,  user_id, isLoggedIn }) {
  const [isHovered, setIsHovered] = useState(false);
  const [message, setMessage] = useState('')
  const [count, setCount] = useState(0)

  useEffect(() => {
    async function fetchDetail() {
    if (!isLoggedIn) {
      setMessage("Please log in to see book count");
    }
    else {
      setCount(book.count);
    }
  }
  fetchDetail();
  },[isLoggedIn, count])


 return isLoggedIn ? (
    <div
      className="book"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={book.image} alt={book.title} />
      <div className={`book-info ${isHovered ? 'hovered' : ''}`}>
        <h2 className="book-title">{book.title}</h2>
        <p className="book-author">{book.author}</p>
        <div className="book-count-container">
        <p className={`book-count ${count > 5 ? 'more-available' : 'less-available'}`}>Available: {count}</p>
        </div>
      </div>
    </div>
 ) : (
        <div
        className="book"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
        <img src={book.image} alt={book.title} />
        <div className={`book-info ${isHovered ? 'hovered' : ''}`}>
          <h2 className="book-title">{book.title}</h2>
          <p className="book-author">{book.author}</p>
          <div className="book-count-container">
          <p className="book-count-notloggedin">{message}</p>
          </div>
        </div>
      </div>
      );
  
}

export default Book
