import React, { useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import './CheckUserFinePageAdmin.css'

const Example = () => {

    const [userActivityList, setUserActivityList] = useState(null)
    const [userBooks, setUserBooks] = useState(null)
    const [combinedDataFiltered, setCombinedDataFiltered] = useState(null)
    const [showTable, setShowTable] = useState(false)
    const [userID, setUserID] = useState(null)
    const [errorMessage, setErrorMessage] = useState("");

    
    const handleShowActivity = async (event) => {
        event.preventDefault();

        try {
            const userEmail = event.target.elements.fineUserEmail.value;
            const userResponse = await fetch(`http://localhost:3000/users/searchemail/${userEmail}`);
            const userData = await userResponse.json();

            if(userData) {
                // const user = (userData && userData.find(usr => usr.email === userEmail))? userData[0].id : ""
                const user = userData.id;
                // if (user !== "") {
                    setUserID(user)
                    setShowTable(true);
                // }
            }
            else {
                setErrorMessage("User not available")
                setShowTable(false);
            }
        }
        catch(error) {
            console.error(error)
        }
    }

    useEffect(() => {
        async function fetchDetails() {
            try {
            const activityListResponse = await fetch(`http://localhost:3000/getfinedetails/${userID}`)
            const activityListData = await activityListResponse.json();
            if(activityListResponse.status === 200) {
                setUserActivityList(activityListData);
            }

            const bookResponse = await fetch("http://localhost:3000/books");
            const bookData = await bookResponse.json();
            setUserBooks(bookData);
            }
            catch(error) {
                console.error(error)
            }
        }
        fetchDetails();
    }, [userID])

    useEffect(() => {
        function generateCombinedData() {

            if(userActivityList && userBooks)  {
                const combinedData = 
                userActivityList.map((activityListItem) => ({
                    ...activityListItem,
                    books: activityListItem.booksBorrowed.map((book) => ({
                        ...book,
                        bookImage: userBooks.find(b => b.id === book.book_id)?.image || '',
                        bookName: userBooks.find(b => b.id === book.book_id)?.title || ''}))
                    }))
                    // const combinedDataModified = (combinedData) ? combinedData.filter(data => data.books.length !== 0) : null
                    const combinedDataModified = combinedData.flatMap(activityListItem =>
                                                    activityListItem.books
                                                    .filter(book => !book.finePaid && book.fineToPay > 0)
                                                    .map(book => ({
                                                        ...book,
                                                        fineToPay: parseFloat(book.fineToPay).toFixed(2)
                                                    }))
                                                    .map(book => ({
                                                        ...book,
                                                        userId: activityListItem.userId,
                                                        checkOutDate: activityListItem.checkOutDate,
                                                        returnDate: activityListItem.returnDate,
                                                        actualReturnDate: activityListItem.actualReturnDate,
                                                        finePaid: book.finePaid ? 'Yes' : 'No'
                                                    }))
                                                )
                    setCombinedDataFiltered(combinedDataModified)
            }
        }
        generateCombinedData()
    }
    , [userActivityList, userBooks]
    )

    return(
        <>
        <TopNav />
            <div>
                <h2 className="fine-table-admin-header">User Fine</h2>
                <form className = 'fine-table-admin-form' onSubmit={handleShowActivity}>
                    <label className = 'fine-table-admin-label' htmlFor = "fineUserEmail">User Name:</label>
                    <input type = "text" id = "fineUserEmailInput" name="fineUserEmail"></input>
                    <button id="myButtonFine" type="submit">Show</button>
            </form>
            </div>

            <div>
                {showTable ? (
                <table className="fine-table-admin">
                    <thead>
                        <tr>
                            <th>Book Image</th>
                            <th>Book Name</th>
                            <th>Check Out Date</th>
                            <th>Return Date</th>
                            <th>Actual Return Date</th>
                            <th>Fine Paid</th>
                            <th colSpan="9">Fine</th>
                        </tr>
                        </thead>
                            <tbody>
                                {
                                !combinedDataFiltered ?  (<tr>
                                    <td colSpan="7">Loading...</td>
                                </tr>) : combinedDataFiltered.length > 0 ?
                                ( combinedDataFiltered.map((activityListItem) => (
                                    activityListItem.books.map((book) => (
                                        <tr key = {book.id}>
                                            <td><img src = {book.bookImage} alt = {`${book.bookName} cover`}/></td>
                                            <td>{book.bookName}</td>
                                            <td>{book.checkOutDate}</td>
                                            <td>{book.returnDate}</td>
                                            <td>{book.actualReturnDate}</td>
                                            <td>{book.finePaid ? "Yes" : "No"}</td>
                                            <td colSpan="8">{book.fineToPay}</td>
                                        </tr>
                                    ))
                                ))) : (
                                    <tr>
                                        <td colSpan="8">No fine exists for user</td>
                                    </tr>
                                    )}
                                {
                                    combinedDataFiltered !== null && combinedDataFiltered.length !== 0 && (
                                        <tr>
                                            <td id="fine-table-admin-total-fine" colSpan="8">Total Fine</td>
                                            <td>
                                                {
                                                    combinedDataFiltered
                                                    .flatMap((activityItem) => activityItem.books)
                                                    .reduce((totalFine, book) => totalFine + (book.fineToPay || 0),0)
                                                }
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                </table>
                )
                : (
                errorMessage && <div className="fine-table-admin-error">{errorMessage}</div>
                )
                }    
            </div>
        </>
    )
}

export default Example;
