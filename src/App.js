import React, { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/recipeList";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import SavedRecipes from "./components/SavedRecipes";
import ProtectedRoute from "./utils/ProtectedRoutes";
import Pagination from "./utils/Paginate";
import RecipePage from "./components/RecipePage";
import RegisterAndLogin from "./components/registerAndLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./components/homepage";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const recipesPerPage = 12;
  const indexOfLast = currentPage * recipesPerPage;
  const indexOfFirst = indexOfLast - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSearchResults = (results) => {
    setRecipes(results);
    setCurrentPage(1);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="app">
      <header className="navbar">
        <div className="navbar-inner">
          <Link
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            to="/"
            className="navbar-brand"
          >
            <img
              className="logo"
              src="/food_finder_logo.png"
              alt="Food Finder"
            />
          </Link>

          <nav className="nav-links">
            <Link
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              to="/search"
              className="nav-link"
            >
              <span>🍳</span>
              Search
            </Link>

            {isAuthenticated && (
              <Link
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                to="/saved"
                className="nav-link"
              >
                <span>♥</span>
                Saved
              </Link>
            )}

            {isAuthenticated ? (
              <button className="nav-auth-button" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <button
                className="nav-auth-button"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className="main">
        <Routes>
          <Route
            path="/search"
            element={
              <div className="search-page">
                <SearchBar
                  onResults={handleSearchResults}
                  setLoading={setLoading}
                />

                <RecipeList recipes={currentRecipes} loading={loading} />

                {!loading && recipes.length > 0 && (
                  <Pagination
                    totalRecipes={recipes.length}
                    recipesPerPage={recipesPerPage}
                    paginate={paginate}
                  />
                )}
              </div>
            }
          />

          <Route path="/" element={<HomePage />} />

          <Route
            path="/saved"
            element={
              <ProtectedRoute>
                <SavedRecipes />
              </ProtectedRoute>
            }
          />

          <Route path="/recipes/:id" element={<RecipePage />} />

          <Route path="/login" element={<RegisterAndLogin />} />
        </Routes>

        <ToastContainer
          position="top-center"
          autoClose={3000}
          toastClassName="food-toast"
        />
      </main>

      <footer className="site-footer">
        <div className="footer-content">
          <Link to="/" className="footer-brand">
            <img src="/food_finder_logo.png" alt="Food Finder" />
          </Link>

          <p>Find something delicious with what you already have.</p>

          <div className="footer-links">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy</Link>
          </div>

          <span className="footer-copy">
            © {new Date().getFullYear()} Food Finder
          </span>
        </div>
      </footer>
    </div>
  );
};

export default App;
