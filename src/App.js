import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookDetailPage from './pages/BookDetailPage';
import SearchPage from './pages/SearchPage';
import RegisterUserPage from './pages/RegisterUserPage';
import SignInPage from './pages/SignInPage';
import UserActivitiesPageAdmin from './pages/UserActivitiesPageAdmin';
import CheckUserFinePageAdmin from './pages/CheckUserFinePageAdmin';
import AddBookPage from './pages/AddBookPage';
import DeleteBookPage from './pages/DeleteBookPage';
import UpdateBookCountPage from './pages/UpdateBookCountPage';
import AllPendingRequestsPage from './pages/AllPendingRequestsPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/register" element={<RegisterUserPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/books/:id" element={<BookDetailPage />} />
          <Route path="/userActivitiesAdmin" element={<UserActivitiesPageAdmin />} />
          <Route path="/checkUserFineAdmin" element={<CheckUserFinePageAdmin />} />
          <Route path="/addBookAdmin" element={<AddBookPage/>} />
          <Route path="/deleteBookAdmin" element={<DeleteBookPage />} />
          <Route path="/updateBookCountAdmin" element={<UpdateBookCountPage />} />
          <Route path="/allPendingRequestsAdmin" element={<AllPendingRequestsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
