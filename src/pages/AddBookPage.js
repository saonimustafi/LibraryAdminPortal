import React, { useState } from 'react'
import TopNav from '../components/TopNav'
import './AddBookPage.css'

const AddBookPage = () => {
    const [image, setImage] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [category, setCategory] = useState('')
    const [count, setCount] = useState(0)
    const [addBookResponse, setAddBookResponse] = useState(null)
    

    const handleAddBook = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:3000/books/newbook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image, title, author, category, count })
        });

        const responseData = await response.json()
        setAddBookResponse(responseData)

        if(response.status === 201) {
            alert("Book has been added")
        }
        else if (response.status === 200 && responseData.message === "Book already exists, please increase the count") {
            alert("Book already exists, please increase the count")
        }
        else if(addBookResponse.message === "Book validation failed") {
            alert("Please enter all the details before submitting the form")
        }
    }

  return (
    <>
    <div>
        <TopNav />
        <div>
            <h2 className = 'admin-add-book-header'>Add Book</h2>
        </div>

        <form className = 'admin-add-book-form' onSubmit = {handleAddBook}>
            <div className='admin-add-book-div'>
                <label className = 'admin-add-book-label' htmlFor="title">Title:</label>
                <input className = 'admin-add-book-input' type = "text" id={title} value={title} onChange={event=> setTitle(event.target.value)}/>
            </div>

            <div className='admin-add-book-div'>
                <label className = 'admin-add-book-label' htmlFor="image">Image:</label>
                <input className = 'admin-add-book-input' type = "text" id={image} value={image} onChange={event=> setImage(event.target.value)}/>
            </div>

            <div className = 'admin-add-book-div'>
                <label className = 'admin-add-book-label' htmlFor="author">Author:</label>
                <input  className = 'admin-add-book-input' type = "text" id={author} value={author} onChange={event=> setAuthor(event.target.value)}/>
            </div>

            <div className='admin-add-book-div'>
                <label className = 'admin-add-book-label' htmlFor="category">Category:</label>
                <input className = 'admin-add-book-input' type = "text" id={category} value={category} onChange={event=> setCategory(event.target.value)}/>
            </div>

            <div className='admin-add-book-div'>
                <label className = 'admin-add-book-label' htmlFor="count">Count:</label>
                <input className = 'admin-add-book-input' type = "number" id={count} value={count} onChange={event=> setCount(event.target.value)}/>
            </div>

            <button id='admin-add-book-button' type="submit">Add Book</button>
        </form>
    </div>
    </>
  )
}

export default AddBookPage
