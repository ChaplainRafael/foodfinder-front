import React from "react";
import RandomRecipe from "./RandomRecipes";
import { Link } from "react-router-dom";

const HomePage=()=>{

    return (
    <>
        <div className="hero">
            <div className="welcome">
              <h3>Let Me Help You Cook!</h3>
              <p>I Can Help You Find Recipes To Cook Easily, How? Just Tell Me What You Have Right Now And I Will Find Recipes For You. 😊</p>
              <Link to="/search" >
                <button>Get Started</button>
              </Link>
            </div>
            <img src="hero.png" alt="title" />
          </div>
          <div className="how-to">
            <img src="qm.jpg" alt="how-to" />
            <div className="how-to-list">
            <h3 className='how-to-heading'>How does it work?</h3>
            <ul>
              <li>1. See what you have at hand in the house.</li>
              <p>Look through your available ingredients!</p>
              <li>2. Type them in the search bar.</li>
              <p>Make sure you type them comma-separated like (egg, milk, flour, ...).</p>
              <li>3. Check the recipes.</li>
              <p>See which one you like, then click on it and follow the instructions.</p>
            </ul>
              <Link to="/search" >
                <button>Get Started</button>
              </Link>
            </div>
          </div>
          <div className="why-us">
            <div className="title">Why use Food finder?</div>
            <div className="why-item-wrapper">
              <div className="why-item">
                <img src="ingredient.jpg" alt="ingredient" />
                <h3>Smart Cooking!</h3>
                <p>Turn what you already have at home into a delicious meal. Just enter your ingredients and we’ll show you what you can make—no waste, no stress.</p>
              </div>
              <div className="why-item">
                <img src="cooking.jpg" alt="cooking" />
                <h3>Endless Inspiration</h3>
                <p>Explore a growing library of diverse recipes for every taste, diet, and craving. Whether you're vegan or a meat-lover, there's something for you.</p>
              </div>
              <div className="why-item">
                <img src="food.jpg" alt="food" />
                <h3>Totally Free</h3>
                <p>No sign-ups, no hidden costs—just fast, helpful results. Cook what you want, when you want, without any strings attached.</p>
              </div>
            </div>
          </div>
          <div className="random-recipes">
            <div className="h3-title"><h3>How about some Random recipes?</h3></div>
            
            <RandomRecipe/>

          </div>
    </>
    )
}

export default HomePage;