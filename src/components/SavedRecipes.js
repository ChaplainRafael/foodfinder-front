import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./styles/savedRecipes.css";

const SavedRecipes = () => {
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);

      if (!token) {
        setError("Please sign in to view your saved recipes.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/recipes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSaved(response.data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
        setError("We couldn't load your saved recipes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [token, API_BASE_URL, retryCount]);

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/recipes/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSaved((prev) => prev.filter((recipe) => recipe._id !== _id));
      toast.success("Recipe removed!");
    } catch (error) {
      toast.error("Failed to delete recipe.");
      console.error(error);
    }
  };

  const handleDetail = (recipe) => {
    navigate(`/recipes/${recipe.originalId}`);
  };

  if (loading) {
    return (
      <main className="saved-page">
        <section className="saved-empty">
          <h1>Loading your recipe box...</h1>
          <p>Please wait while we retrieve your saved recipes.</p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="saved-page">
        <section className="saved-empty">
          <h1>Unable to load recipes</h1>
          <p>{error}</p>

          {token ? (
            <button
              className="saved-primary-button"
              onClick={() => setRetryCount((count) => count + 1)}
            >
              Try again
            </button>
          ) : (
            <button
              className="saved-primary-button"
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          )}
        </section>
      </main>
    );
  }

  if (saved.length === 0) {
    return (
      <main className="saved-page">
        <section className="saved-empty">
          <div className="saved-empty-icon">🍲</div>

          <span className="saved-eyebrow">YOUR RECIPE BOX</span>

          <h1>Your recipe box is empty</h1>

          <p>
            Save recipes you love and they'll wait here whenever you're ready to
            cook.
          </p>

          <button
            className="saved-primary-button"
            onClick={() => navigate("/search")}
          >
            Find a recipe
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="saved-page">
      <section className="saved-header">
        <div>
          <span className="saved-eyebrow">YOUR RECIPE BOX</span>

          <h1>
            Recipes worth
            <span> keeping.</span>
          </h1>

          <p>Your favorite recipes, all in one cozy little place.</p>
        </div>

        <div className="saved-count">
          <strong>{saved.length}</strong>
          <span>{saved.length === 1 ? "recipe" : "recipes"} saved</span>
        </div>
      </section>

      <section className="saved-content">
        <ul className="saved-recipe-list">
          {saved.map((recipe) => (
            <li key={recipe._id} className="saved-recipe-card">
              <div className="saved-image-wrapper">
                <img src={recipe.image} alt={recipe.title} />

                <span className="saved-bookmark">♥</span>
              </div>

              <div className="saved-card-content">
                <span className="saved-card-label">SAVED RECIPE</span>

                <h2>{recipe.title}</h2>

                <p>Ready to cook whenever you are.</p>

                <div className="saved-card-actions">
                  <button
                    className="saved-details-button"
                    onClick={() => handleDetail(recipe)}
                  >
                    View recipe
                  </button>

                  <button
                    className="saved-remove-button"
                    onClick={() => handleDelete(recipe._id)}
                    aria-label={`Remove ${recipe.title}`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="saved-bottom-cta">
        <div className="saved-cta-cat">
          <img src="/login-cat.png" alt="Chef cat" />
        </div>

        <div>
          <span className="saved-eyebrow">HUNGRY FOR SOMETHING NEW?</span>
          <h2>Find your next favorite.</h2>
          <p>
            Tell us what ingredients you have and we'll find something
            delicious.
          </p>
        </div>

        <button
          className="saved-primary-button"
          onClick={() => navigate("/search")}
        >
          Search recipes
        </button>
      </section>
    </main>
  );
};

export default SavedRecipes;
