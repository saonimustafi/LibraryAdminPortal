import React, { useState } from 'react'
import TopNav from '../components/TopNav'
// import { useParams } from 'react-router-dom'
import './DeleteBookPage.css'

const DeleteBookPage = () => {
    const [title, setTitle] = useState('')

    const handleDeleteBook = async (event) => {
        event.preventDefault();

        const response = await fetch(`http://localhost:3000/books/deletebookname/${title}`, {
            method: 'DELETE'
        });

        if(response.status === 200) {
            alert("Book has been deleted")
        }
        else if (response.status === 404) {
            alert("Book not found")
        }
        else {
            alert("Something went wrong")
        }
    }
  return (
    <div>
        <div>
            <h2 className = 'admin-delete-book-header'>Delete Book</h2>
        </div>
        <form className = 'admin-delete-book-form' onSubmit = {handleDeleteBook}>
            <div className='admin-delete-book-div'>
                <label className = 'admin-delete-book-label' htmlFor="title">Title:</label>
                <input className = 'admin-delete-book-input' type = "text" id={title} value={title} onChange={event=> setTitle(event.target.value)}/>
            </div>

            <button id='admin-delete-book-button' type="submit">Delete Book</button>
        </form> 
    </div>
  )
}

export default DeleteBookPage
