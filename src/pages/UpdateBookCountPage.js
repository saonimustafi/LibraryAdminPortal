import React, { useState } from 'react'
import './UpdateBookCountPage.css'
import TopNav from '../components/TopNav'

const UpdateBookCountPage = () => {
    const [title, setTitle] = useState('')
    const [count, setCount] = useState(0)
    // const [updateBookCountResponse, setUpdateBookCountResponse] = useState()

    const handleUpdateBook = async(event) => {
        event.preventDefault();

        const response = await fetch(`http://localhost:3000/books/updatecount/${title}`, {
            method: 'PUT',
            headers: {
                'count': count,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, count })
        });

        const responseData = await response.json()
        // setUpdateBookCountResponse(responseData)

        if(response.status === 200) {
            alert("Book has been updated")
        }
        else if (response.status === 404) {
            alert("Book does not exists")
        }
        else if(response.status === 500) {
            alert("Something went wrong")
        }
    }


  return (
    <div>
        <TopNav />
        <div>
            <h2 className = 'admin-update-book-count-header'>Update Book Count</h2>
        </div>
      <form className = 'admin-update-book-count-form' onSubmit = {handleUpdateBook}>
            <div className='admin-update-book-count-book-div'>
                <label className = 'admin-update-book-count-label' htmlFor="title">Title:</label>
                <input className = 'admin-update-book-count-input' type = "text" id={title} value={title} onChange={event=> setTitle(event.target.value)}/>
            </div>

            <div className='admin-update-book-count-book-div'>
                <label className = 'admin-update-book-count-label' htmlFor="title">New Count:</label>
                <input className = 'admin-update-book-count-input' type = "number" id={count} value={title} onChange={event=> setCount(event.target.value)}/>
            </div>

            <button id='admin-update-book-count-button' type="submit">Update Book Count</button>
        </form> 
    </div>
  )
}

export default UpdateBookCountPage
