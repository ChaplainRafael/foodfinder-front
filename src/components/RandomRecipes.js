import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RandomRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get("https://api.spoonacular.com/recipes/random", {
          params: {
            apiKey: process.env.REACT_APP_API_KEY,
            number: 9,
          },
        });
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
    slidesToShow: 4,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    return <div className="loader"><ClipLoader color="#36d7b7" loading={true} size={100} /></div>;
  }

  return (
    
    <div className="slider-wrapper">
      <Slider {...settings}>
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.title} className="recipe-image" />
            <div className="recipe-content">
            <Link to={`/recipes/${recipe.id}`}>
              <h3 style={{width:'100%'}}>{recipe.title}</h3>
              </Link>
  
              
              <p className="meta-line">
                <strong>Cuisine:</strong> {recipe.cuisines?.join(", ") || "Unknown"} &nbsp; | &nbsp;
                <strong>Takes:</strong> {recipe.readyInMinutes} mins
              </p>
  
              
              <p className="ingredients-line">
                <strong>Ingredients:</strong>{" "}
                {recipe.extendedIngredients
                  ?.slice(0, 5)
                  .map((ing) => ing.name)
                  .join(", ")}
              </p>
  
              {/* Summary */}
              <p
                className="recipe-summary"
                dangerouslySetInnerHTML={{
                  __html: recipe.summary.slice(0, 120) + "...",
                }}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
  
};  

export default RandomRecipe;
