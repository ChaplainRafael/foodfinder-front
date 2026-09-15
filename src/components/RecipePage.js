import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import "./styles/recipePage.css";

const RecipePage = () => {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information`,
          {
            params: {
              apiKey: process.env.REACT_APP_API_KEY,
            },
          },
        );

        setRecipe(res.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handleSave = async (recipe) => {
    const token = localStorage.getItem("token");

    const ingredients = recipe.extendedIngredients?.map((ingredient) => ({
      name: ingredient.name,
      amount: ingredient.amount,
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
      <div className="recipe-page-loader">
        <div className="recipe-page-loader-card">
          <span>🍳</span>

          <ClipLoader color="#e87561" loading={true} size={48} />

          <p>Preparing your recipe...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="recipe-not-found">
        <div className="recipe-not-found-icon">🍽️</div>

        <h2>Recipe not found</h2>

        <p>Something went wrong while trying to find this recipe.</p>
      </div>
    );
  }

  const instructions =
    recipe.instructions
      ?.replace(/<[^>]+>/g, "")
      .split(/\.(?:\s+|\n|$)/)
      .map((step) => step.trim())
      .filter(Boolean) || [];

  return (
    <main className="recipe-page">
      {/* =========================================
          HERO
          ========================================= */}

      <section className="recipe-hero">
        <div className="recipe-hero-image-wrapper">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="recipe-hero-image"
          />

          <span className="recipe-hero-badge">✦ Recipe</span>
        </div>

        <div className="recipe-hero-content">
          <span className="recipe-eyebrow">Your next kitchen adventure</span>

          <h1>{recipe.title}</h1>

          <p className="recipe-intro">
            Everything you need to know to turn your ingredients into something
            delicious.
          </p>

          <button
            type="button"
            className="recipe-save-button-large"
            onClick={() => handleSave(recipe)}
          >
            <span>♡</span>
            Save this recipe
          </button>
        </div>
      </section>

      {/* =========================================
          QUICK INFO
          ========================================= */}

      <section className="recipe-stats">
        <div className="recipe-stat">
          <span className="recipe-stat-icon">👥</span>

          <div>
            <strong>{recipe.servings}</strong>
            <span>Servings</span>
          </div>
        </div>

        <div className="recipe-stat">
          <span className="recipe-stat-icon">⏱</span>

          <div>
            <strong>{recipe.readyInMinutes}</strong>
            <span>Minutes</span>
          </div>
        </div>

        <div className="recipe-stat">
          <span className="recipe-stat-icon">💰</span>

          <div>
            <strong>${(recipe.pricePerServing / 100).toFixed(2)}</strong>
            <span>Per serving</span>
          </div>
        </div>

        {recipe.cuisines?.length > 0 && (
          <div className="recipe-stat">
            <span className="recipe-stat-icon">🌍</span>

            <div>
              <strong>{recipe.cuisines[0]}</strong>
              <span>Cuisine</span>
            </div>
          </div>
        )}
      </section>

      {/* =========================================
          RECIPE BODY
          ========================================= */}

      <section className="recipe-body">
        {/* INGREDIENTS */}

        <div className="recipe-section ingredients-section">
          <div className="recipe-section-heading">
            <span className="recipe-section-number">01</span>

            <div>
              <span>What you'll need</span>
              <h2>Ingredients</h2>
            </div>
          </div>

          <ul className="ingredients-list">
            {recipe.extendedIngredients?.map((ingredient, index) => (
              <li key={ingredient.id || index}>
                <span className="ingredient-check">✓</span>

                <span className="ingredient-name">{ingredient.original}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* INSTRUCTIONS */}

        <div className="recipe-section instructions-section">
          <div className="recipe-section-heading">
            <span className="recipe-section-number">02</span>

            <div>
              <span>Let's get cooking</span>
              <h2>Instructions</h2>
            </div>
          </div>

          {instructions.length > 0 ? (
            <ol className="instructions-list">
              {instructions.map((step, index) => (
                <li key={index}>
                  <span className="instruction-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p>{step}.</p>
                </li>
              ))}
            </ol>
          ) : (
            <div className="no-instructions">
              <span>👨‍🍳</span>
              <p>Instructions aren't available for this recipe.</p>
            </div>
          )}
        </div>
      </section>

      {/* =========================================
          BOTTOM CTA
          ========================================= */}

      <section className="recipe-bottom-cta">
        <div>
          <span>Kitchen approved ✦</span>

          <h2>Ready to cook?</h2>

          <p>
            Gather your ingredients, put on your chef hat, and let's make
            something delicious.
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleSave(recipe)}
          className="recipe-cta-button"
        >
          <span>♡</span>
          Save recipe
        </button>
      </section>
    </main>
  );
};

export default RecipePage;
