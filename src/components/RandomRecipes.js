import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles/randomRecipes.css";

const RandomRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(
          "https://api.spoonacular.com/recipes/random",
          {
            params: {
              apiKey: process.env.REACT_APP_API_KEY,
              number: 9,
            },
          },
        );

        setRecipes(res.data.recipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    return (
      <div className="random-recipes-loader">
        <div className="random-loader-card">
          <span className="random-loader-icon">🍳</span>
          <ClipLoader color="#e87561" loading={true} size={48} />
          <p>Finding something delicious...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="random-recipes">
      <div className="random-recipes-header">
        <div>
          <span className="random-recipes-eyebrow">A little inspiration</span>

          <h2>What's cooking?</h2>

          <p>
            Don't know what to make? Let the kitchen surprise you with something
            delicious.
          </p>
        </div>

        <div className="random-recipes-badge">
          <span>✦</span>
          Fresh picks
        </div>
      </div>

      <div className="random-slider-wrapper">
        <Slider {...settings}>
          {recipes.map((recipe) => (
            <div key={recipe.id} className="random-slide">
              <article className="random-recipe-card">
                <Link
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  to={`/recipes/${recipe.id}`}
                  className="random-recipe-image-link"
                >
                  <div className="random-recipe-image-wrapper">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="random-recipe-image"
                    />

                    <span className="random-recipe-time">
                      ⏱ {recipe.readyInMinutes} min
                    </span>
                  </div>
                </Link>

                <div className="random-recipe-content">
                  <div className="random-recipe-type">
                    {recipe.cuisines?.length
                      ? recipe.cuisines[0]
                      : "Home cooking"}
                  </div>

                  <Link
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    to={`/recipes/${recipe.id}`}
                    className="random-recipe-title-link"
                  >
                    <h3>{recipe.title}</h3>
                  </Link>

                  <div className="random-recipe-details">
                    <span>
                      <strong>Ingredients</strong>
                      {recipe.extendedIngredients
                        ?.slice(0, 4)
                        .map((ingredient) => ingredient.name)
                        .join(", ") || "See recipe"}
                    </span>
                  </div>

                  <Link
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    to={`/recipes/${recipe.id}`}
                    className="random-recipe-button"
                  >
                    View recipe
                    <span>→</span>
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default RandomRecipe;
