import React from "react";
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';


const RecipeList = ({recipes, loading})=>{
    const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

    const handleSave= async(recipe)=>{
        const token = localStorage.getItem('token');
        const ingredients= recipe.extendedIngredients?.map(i=>({name:i.name}));
        try {
            
               await axios.post(`${API_BASE_URL}/api/recipes`,{
                title:recipe.title,
                image:recipe.image,
                originalId:recipe.id,
                ingredients:ingredients
            },
            {  // Request headers
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success("Recipe saved!");
        } catch (error) {
            if (error.response && error.response.status === 401){
                toast.error("Please Login Again.");
            }
            else if (error.response&&error.response.status === 400){
                toast.error("You Already have this Recipe Saved!");
            }else{
            toast.error("Failed to save recipe.");
            console.log("error while saving recipe:",error);}
        }
    };

    if (loading) return <div className="loader"><ClipLoader color="#36d7b7" loading={true} size={100} /></div>;

    if (recipes.length === 0) return <p className="no-recipes">No recipes found😭Try searching... </p>;


    return (
        
            <ul className="recipe-list">
                
                {recipes.map(recipe => (
                    <li key={recipe.id} className="recipe-card-search">
                        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                        <div className="card-content">
                            <Link to={`/recipes/${recipe.id}`}>
                                <h3>{recipe.title}</h3>
                            </Link>
                            <h3>What else you need?</h3>
                            <p>
                            {recipe.missedIngredients
                                .slice(0, 5)
                                .map(ing => ing.originalName)
                                .join(", ")}
                            </p>

                        </div>
                        
                        <div className="btns">
                            <button onClick={() => handleSave(recipe)}>Save</button>
                            <Link to={`/recipes/${recipe.id}`}>
                                <button >Details</button>
                            </Link>
                        </div>
                    </li>
                    ))}

            </ul>
    )
}

export default RecipeList;