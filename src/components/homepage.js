import React from "react";
import { Link } from "react-router-dom";
import RandomRecipe from "./RandomRecipes";
import "./styles/homepage.css";

const HomePage = () => {
  return (
    <main className="home-page">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="home-hero">
        <div className="home-hero-content">
          <span className="home-eyebrow">YOUR KITCHEN, YOUR INGREDIENTS</span>

          <h1>
            What can we
            <span> cook today?</span>
          </h1>

          <p className="home-hero-description">
            Tell us what ingredients you have at home and we'll find delicious
            recipes you can actually make.
          </p>

          <div className="home-hero-actions">
            <Link
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              to="/search"
              className="home-primary-button"
            >
              Find a Recipe
              <span>→</span>
            </Link>

            <span className="home-action-hint">No complicated setup.</span>
          </div>
        </div>

        <div className="home-hero-mascot">
          <div className="home-hero-blob home-hero-blob-one" />
          <div className="home-hero-blob home-hero-blob-two" />

          <div className="home-mascot-card">
            <img src="hero.png" alt="Chef cat ready to cook" />
          </div>

          <div className="home-floating-card home-floating-ingredients">
            <span className="floating-icon">🥕</span>
            <div>
              <strong>Got ingredients?</strong>
              <small>Let's make something!</small>
            </div>
          </div>

          <div className="home-floating-card home-floating-rating">
            <span>⭐</span>
            <strong>Recipe time!</strong>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK SEARCH CTA
      ===================================================== */}
      <section className="home-search-card">
        <div className="home-search-icon">🍳</div>

        <div className="home-search-content">
          <span>HUNGRY?</span>

          <h2>Start with what you already have.</h2>

          <p>
            Eggs, tomatoes, rice, chicken... whatever is sitting in your kitchen
            can become your next meal.
          </p>
        </div>

        <Link
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          to="/search"
          className="home-search-button"
        >
          Search Ingredients
          <span>→</span>
        </Link>
      </section>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}
      <section className="home-how-section">
        <div className="home-section-heading">
          <span>SUPER SIMPLE</span>

          <h2>
            From ingredients
            <br />
            to <em>dinner.</em>
          </h2>

          <p>
            No endless scrolling through recipes you can't make. Just tell us
            what's in your kitchen.
          </p>
        </div>

        <div className="home-steps">
          <article className="home-step">
            <div className="home-step-number">01</div>

            <div className="home-step-icon">🧺</div>

            <h3>Check your kitchen</h3>

            <p>
              Look around and see which ingredients you already have available.
            </p>
          </article>

          <div className="home-step-connector">→</div>

          <article className="home-step">
            <div className="home-step-number">02</div>

            <div className="home-step-icon">✏️</div>

            <h3>Tell us what you have</h3>

            <p>
              Enter your ingredients into the search bar, separated by commas.
            </p>
          </article>

          <div className="home-step-connector">→</div>

          <article className="home-step">
            <div className="home-step-number">03</div>

            <div className="home-step-icon">🍝</div>

            <h3>Pick your meal</h3>

            <p>
              Browse the results, choose something delicious, and start cooking.
            </p>
          </article>
        </div>
      </section>

      {/* =====================================================
          WHY FOOD FINDER
      ===================================================== */}
      <section className="home-benefits">
        <div className="home-benefits-heading">
          <span>WHY FOOD FINDER?</span>

          <h2>
            Less thinking.
            <br />
            More <strong>eating.</strong>
          </h2>
        </div>

        <div className="home-benefit-grid">
          <article className="home-benefit home-benefit-large">
            <div className="home-benefit-image">
              <img
                src="ingredient.jpg"
                alt="Fresh ingredients ready for cooking"
              />
            </div>

            <div className="home-benefit-content">
              <span>01</span>

              <h3>Cook what you have.</h3>

              <p>
                Turn forgotten ingredients into something worth eating instead
                of letting them sit in the fridge.
              </p>
            </div>
          </article>

          <article className="home-benefit">
            <div className="home-benefit-small-icon">✨</div>

            <span>02</span>

            <h3>Endless inspiration.</h3>

            <p>
              Discover recipes for different tastes, cravings, diets, and
              occasions.
            </p>
          </article>

          <article className="home-benefit home-benefit-accent">
            <div className="home-benefit-small-icon">❤️</div>

            <span>03</span>

            <h3>Completely free.</h3>

            <p>
              No subscriptions. No hidden costs. Just find something good to
              cook.
            </p>
          </article>
        </div>
      </section>

      {/* =====================================================
          RANDOM RECIPES
      ===================================================== */}
      <section className="home-recipes">
        <div className="home-recipes-heading">
          <div>
            <span>NEED SOME INSPIRATION?</span>

            <h2>
              Let the chef
              <br />
              <em>choose.</em>
            </h2>
          </div>

          <Link
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            to="/search"
            className="home-outline-button"
          >
            Explore Recipes →
          </Link>
        </div>

        <div className="home-recipes-display">
          <RandomRecipe />
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}
      <section className="home-final-cta">
        <div className="home-final-mascot">
          <img src="hero.png" alt="Chef cat" />
        </div>

        <div className="home-final-content">
          <span>THE FRIDGE IS WAITING.</span>

          <h2>
            Let's make
            <br />
            something <em>good.</em>
          </h2>

          <p>Grab your ingredients and let Food Finder do the thinking.</p>

          <Link
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            to="/search"
            className="home-primary-button"
          >
            Find My Recipe
            <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
