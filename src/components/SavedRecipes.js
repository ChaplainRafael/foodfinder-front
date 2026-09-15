import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./styles/savedRecipes.css";

const SavedRecipes = () => {
  const [saved, setSaved] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/recipes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSaved(response.data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };

    fetchRecipes();
  }, [token, API_BASE_URL]);

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
