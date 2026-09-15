import React, { useState } from "react";
import axios from "axios";
import "./styles/searchBar.css";

const SearchBar = ({ onResults, setLoading }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    setLoading(true);

    try {
      const response = await axios.get(
        "https://api.spoonacular.com/recipes/findByIngredients",
        {
          params: {
            apiKey: process.env.REACT_APP_API_KEY,
            ingredients: query,
            number: 24,
          },
        },
      );

      onResults(response.data);
    } catch (error) {
      console.error("Error fetching recipes", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="search-section">
      <div className="search-card">
        <div className="search-character">
          <div className="search-cat-bubble">
            <img src="/login-cat.png" alt="Chef cat" />
          </div>
        </div>

        <div className="search-content">
          <span className="search-eyebrow">WHAT'S IN YOUR KITCHEN?</span>

          <h1>
            Let's find something
            <span> delicious.</span>
          </h1>

          <p className="search-description">
            Tell me what ingredients you have and I'll find recipes you can make
            right now.
          </p>

          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-wrapper">
              <span className="search-input-icon">🥕</span>

              <input
                type="text"
                placeholder="egg, milk, flour, chicken..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-bar-input"
                aria-label="Enter ingredients"
              />

              {query && (
                <button
                  type="button"
                  className="clear-search"
                  onClick={() => setQuery("")}
                  aria-label="Clear ingredients"
                >
                  ×
                </button>
              )}
            </div>

            <button type="submit" className="search-button">
              <span>Find recipes</span>
              <span className="search-button-icon">→</span>
            </button>
          </form>

          <div className="search-hint">
            <span>TIP</span>
            <p>Separate ingredients with commas for better results.</p>
          </div>
        </div>
      </div>

      <div className="ingredient-examples">
        <span>Try:</span>

        <button type="button" onClick={() => setQuery("egg, cheese, tomato")}>
          egg + cheese + tomato
        </button>

        <button type="button" onClick={() => setQuery("chicken, rice, onion")}>
          chicken + rice + onion
        </button>

        <button
          type="button"
          onClick={() => setQuery("potato, garlic, butter")}
        >
          potato + garlic + butter
        </button>
      </div>
    </section>
  );
};

export default SearchBar;
