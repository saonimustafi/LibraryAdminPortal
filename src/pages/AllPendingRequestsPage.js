import React, { useEffect, useState } from 'react'
import TopNav from '../components/TopNav';
import './AllPendingRequestsPage.css'

const AllPendingRequestsPage = () => {
    const [pendingRequests, setPendingRequests] = useState(null);
    const [allbooks, setAllBooks] = useState(null)
    const [allUsers, setAllUsers] = useState(null)
    const [combinedDataFiltered, setCombinedDataFiltered] = useState(null)

    useEffect(() => {
        async function fetchData() {
          try {
            const [pendingRequestsResponse, booksResponse, usersResponse] = await Promise.all([
              fetch('http://localhost:3000/allpendingrequests'),
              fetch('http://localhost:3000/books'),
              fetch('http://localhost:3000/users'),
            ]);
      
            const pendingRequestsData = await pendingRequestsResponse.json();
            const booksData = await booksResponse.json();
            const usersData = await usersResponse.json();
      
            setPendingRequests(pendingRequestsData);
            setAllBooks([booksData]);
            setAllUsers([usersData]);
          } catch (error) {
            console.error(error);
          }
        }
      
        fetchData();
      }, []);
      
      useEffect(() => {
        if (pendingRequests && allbooks && allUsers) {
        // const pendingRequestsFiltered = pendingRequests.filter(item => item.books.some(book => book.approvalStatus === "Pending"));
        const pendingRequestsFiltered = pendingRequests
        .map(item => {
          return {
            ...item,
            books: item.books.filter(book => book.approvalStatus === "Pending")
          }
        });
      
          const combinedData = pendingRequestsFiltered.map((requestedBook) => {
            const user = allUsers[0].find((user) => user.id === requestedBook.user_id);
            return {
              ...requestedBook,
      
              books: requestedBook.books.map((book) => ({
                ...book,
                userEmail: user ? user.email : '',
                bookImage: (book && allbooks[0].find((b) => b.id === book.book_id))
                  ? allbooks[0].find((b) => b.id === book.book_id).image
                  : '',
              })),
            };
          });
      
          const combinedDataModified = combinedData ? combinedData.filter((data) => data.books.length !== 0) : null;
          setCombinedDataFiltered(combinedDataModified);
        }
      }, [pendingRequests, allbooks, allUsers]);
      

    // useEffect(() => {
    //     async function fetchPendingRequests() {
    //         try {
    //             const response = await fetch('http://localhost:3000/allpendingrequests');
    //             const responseData = await response.json();
    //             setPendingRequests(responseData);

    //             const bookResponse = await fetch(`http://localhost:3000/books`);
    //             const bookData = await bookResponse.json();
    //             const bookDataArr = [bookData]
    //             setAllBooks(bookDataArr);

    //             const userResponse = await fetch(`http://localhost:3000/users`);
    //             const userData = await userResponse.json();
    //             const userDataArr = [userData]
    //             setAllUsers(userDataArr);
    //         }
    //         catch(error) {
    //             console.error(error)
    //         }
            
    //         if(pendingRequests && allbooks && allUsers) {
    //             const combinedData = pendingRequests.map((requestedBook) => {
    //                 const user = allUsers[0].find(user => user.id === requestedBook.user_id);
    //                 return {
    //                 ...requestedBook,
                    
    //                 books: requestedBook.books
    //                 .map(book => ({
    //                     ...book,
    //                     userEmail: user ? user.email : '',
    //                     // bookName: (book && allbooks[0].find(b => b.id === book.book_id)) ? allbooks[0].find(b => b.id === book.book_id).title : '',
    //                     bookImage: (book && allbooks[0].find(b => b.id === book.book_id)) ? allbooks[0].find(b => b.id === book.book_id).image : '',
    //                 }))
                
    //             }})
            

    //             const combinedDataModified = (combinedData) ? combinedData.filter(data => data.books.length !== 0) : null
    //             setCombinedDataFiltered(combinedDataModified)

    //         }

    //     }
    //     fetchPendingRequests()
    // }, [])

  return (
    <>  
    <TopNav />
    
    <div>
        <h2 className = 'all-pending-requests-admin-header'>All Pending Requests</h2>
    </div>
    <div>
      <table className = "all-pending-requests-admin">
        <thead>
            <th>User Email</th>
            <th>Book Image</th>
            <th>Book Name</th>
            <th>Requested Date</th>
            <th>Approval Status</th>
        </thead>
        <tbody>
            { combinedDataFiltered ? (
                combinedDataFiltered.map((pendingItem, index)=> (
                    
                        <React.Fragment key={pendingItem.user_id}>
                            <tr>
                                <td rowSpan={pendingItem.books.length}>{pendingItem.books[0].userEmail}</td>
                                <td><img src = {pendingItem.books[0].bookImage} alt = {`${pendingItem.books[0].title} cover`}/></td>
                                <td>{pendingItem.books[0].title}</td>
                                <td>{new Date(pendingItem.books[0].requestDate).toLocaleDateString()}</td>
                                <td>{pendingItem.books[0].approvalStatus}</td>
                                
                            </tr>

                            {pendingItem.books.slice(1).map((book) => (
                                            <tr key = {`${pendingItem.user_id} - ${book.id}`}>
                                                <td><img src = {book.bookImage} alt = {`${book.bookImage} cover`}/></td>
                                                <td>{book.title}</td>
                                                <td>{new Date(book.requestDate).toLocaleDateString()}</td>
                                                <td>{book.approvalStatus}</td>
                                            </tr>
                                        ))}
                        </React.Fragment>
                    ))
                )
            : (
                (combinedDataFiltered && combinedDataFiltered.length === 0) ? (
                <tr>
                    <td colSpan="8">No pending request exists</td>
                </tr>
                ) : (
                <tr>
                    <td colSpan="8">Loading...</td>
                </tr>
                )
            )
            }
        </tbody>
      </table>
    </div>
    </>
  )

  
}

export default AllPendingRequestsPage
