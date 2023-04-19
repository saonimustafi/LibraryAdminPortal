import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Book from '../components/Book';
import TopNav from '../components/TopNav';
import { books } from '../data/books';
import './HomePage.css';
import './AddBookPage.js'
import AddBookPage from './AddBookPage.js';

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expanded, setExpanded] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();


  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm('');
    }
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div className="home-page">
      <TopNav />
      <div className={`search-bar-container${expanded ? ' expanded' : ''}`} ref={searchRef}>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search books"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            onFocus={() => setExpanded(true)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="book-grid">
        {books.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;