import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import RecipeList from './components/recipeList';
import {  Routes, Route, Link } from 'react-router-dom';
import SavedRecipes from './components/SavedRecipes';
import ProtectedRoute from './utils/ProtectedRoutes';
import Pagination from './utils/Paginate';
import RecipePage from './components/RecipePage'
import { useNavigate } from 'react-router-dom';
import RegisterAndLogin from './components/registerAndLogin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './components/homepage';

const App=()=> {
  const [recipes,setRecipes]=useState([]);
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [currentPage,setCurrentPage]= useState(1);
  const isAuthenticated = !!localStorage.getItem('token');

  const recipesPerPage= 12
  const indexOfLast= currentPage * recipesPerPage;
  const indexOfFirst = indexOfLast - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirst,indexOfLast);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };


  return (
      <div className="App">
        <nav className='navbar'>
          <Link to="/"><img className='logo' src='food_finder_logo.png' alt='logo'/></Link>
          <div className="links">
          <Link to="/search">Search</Link>
          <Link to="/saved">Saved</Link>
          {isAuthenticated ?<button onClick={handleLogout}>Logout</button> : <button onClick={()=> navigate('/login')}>Login</button>}
          </div>
        </nav>
        <div className="main">

        <Routes>
          <Route path='/search' element={
            <>
            <SearchBar onResults={setRecipes} setLoading={setLoading}/>
            <RecipeList recipes={currentRecipes} loading={loading}/>
            <Pagination
                totalRecipes={recipes.length}
                recipesPerPage={recipesPerPage}
                paginate={paginate}
              />
            </>
          }/>
          
          <Route path="/" element={<HomePage />} />
          <Route path='/saved' element={<ProtectedRoute><SavedRecipes/></ProtectedRoute>}/>
          <Route path="/recipes/:id" element={<RecipePage />} />
          <Route path="/login" element={<RegisterAndLogin />} />

        </Routes>
        <ToastContainer position="top-center" autoClose={3000} />
        </div>
        <footer className="site-footer">
          <div className="footer-content">
            <p>&copy; {new Date().getFullYear()} YourRecipeSite. All rights reserved.</p>
            <div className="footer-links">
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
              <a href="/privacy">Privacy</a>
            </div>
          </div>
        </footer>
      </div>

  );
}

export default App;
