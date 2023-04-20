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

//   // return isLoggedIn ? (
//   //   <div
//   //     className="book"
//   //     onMouseEnter={() => setIsHovered(true)}
//   //     onMouseLeave={() => setIsHovered(false)}
//   //   >
//   //     <img src={book.image} alt={book.title} />
//   //     <div className={`book-info ${isHovered ? 'hovered' : ''}`}>
//   //       <h2 className="book-title">{book.title}</h2>
//   //       <p className="book-author">{book.author}</p>
//   //       <div className="book-count-container">
//   //       <p className={`book-count ${book.count > 5 ? 'more-available' : 'less-available'}`}>Available: {book.count}</p>
//   //     </div>
//         {/* <p className="book-description">{book.description}</p> */}
//         {/* <button onClick={handleButtonClick}>Add to Cart</button> */}
//         {/* {isInCart ? (
//           <button className="delete-request" onClick={deleteRequest}>Delete request</button>
//         ) : (
//           <button className="request-book" onClick={requestBook}>Request book</button>
//         )} */}
//         {/* {message && <p className={message.includes('Error') ? 'error' : 'success'}>{message}</p>} */}
// {/*         
//         ) : (
          
//             <div>
//               <h2>Loading...</h2>
//             </div>
          
//         )
//   ); */}


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
