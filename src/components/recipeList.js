import React from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./styles/recipeList.css";

const RecipeList = ({ recipes, loading }) => {
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleSave = async (recipe) => {
    const token = localStorage.getItem("token");

    const ingredients = recipe.extendedIngredients?.map((ingredient) => ({
      name: ingredient.name,
    }));

    try {
      await axios.post(
        `${API_BASE_URL}/api/recipes`,
        {
          title: recipe.title,
          image: recipe.image,
          originalId: recipe.id,
          ingredients,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Recipe saved!");
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please Login Again.");
      } else if (error.response?.status === 400) {
        toast.error("You Already have this Recipe Saved!");
      } else {
        toast.error("Failed to save recipe.");
        console.error("Error while saving recipe:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="recipe-list-loader">
        <div className="recipe-list-loader-card">
          <span className="recipe-list-loader-icon">🍳</span>

          <ClipLoader color="#e87561" loading={true} size={48} />

          <p>Looking through the kitchen...</p>
        </div>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="recipe-list-empty">
        <div className="recipe-empty-icon">🍽️</div>

        <h3>Nothing found yet</h3>

        <p>
          Try searching with a few ingredients you already have in the kitchen.
        </p>

        <span className="recipe-empty-hint">Example: egg, milk, flour</span>
      </div>
    );
  }

  return (
    <section className="recipe-results">
      <div className="recipe-results-header">
        <div>
          <span className="recipe-results-eyebrow">Kitchen results</span>

          <h2>Here's what you can make</h2>

          <p>We found recipes based on the ingredients you have available.</p>
        </div>

        <span className="recipe-results-count">
          {recipes.length} {recipes.length === 1 ? "recipe" : "recipes"}
        </span>
      </div>

      <ul className="recipe-list">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="recipe-search-card">
            <Link
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              to={`/recipes/${recipe.id}`}
              className="recipe-search-image-link"
            >
              <div className="recipe-search-image-wrapper">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="recipe-search-image"
                />
              </div>
            </Link>

            <div className="recipe-search-content">
              <span className="recipe-search-label">Recipe match</span>

              <Link
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                to={`/recipes/${recipe.id}`}
                className="recipe-search-title-link"
              >
                <h3>{recipe.title}</h3>
              </Link>

              <div className="recipe-missing-section">
                <span className="recipe-missing-label">You may still need</span>

                <p>
                  {recipe.missedIngredients?.length
                    ? recipe.missedIngredients
                        .slice(0, 5)
                        .map((ingredient) => ingredient.originalName)
                        .join(", ")
                    : "You have everything you need!"}
                </p>
              </div>
            </div>

            <div className="recipe-search-actions">
              <button
                type="button"
                className="recipe-save-button"
                onClick={() => handleSave(recipe)}
              >
                <span>♡</span>
                Save
              </button>

              <Link
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                to={`/recipes/${recipe.id}`}
                className="recipe-details-button"
              >
                Details
                <span>→</span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default RecipeList;
