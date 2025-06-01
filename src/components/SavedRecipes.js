import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const SavedRecipes= ()=>{
    const [saved, setSaved] = useState([]);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";


    useEffect(()=>{
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/recipes`,{
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  });

                setSaved(response.data);

            } catch (error) {
                console.error("failed to fetch recipe :", error);
            }
        };
        fetchRecipe();
    },[token,API_BASE_URL])

    const handleDelete=async (_id)=>{
        try {
            await axios.delete(`${API_BASE_URL}/api/recipes/${_id}`,{
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
            setSaved(prev => prev.filter(recipe => recipe._id !== _id));
            toast.success("Recipe removed!");
        } catch (error) {
            toast.error("Failed to delete recipe.");
            console.error(error);
        }
    };

    const handleDetail=(recipe) => {
        navigate(`/recipes/${recipe.originalId}`)
    }
    if (saved.length === 0) return <p className="no-recipes">No recipes found😭Try saving some... </p>;

    return(
        <div className="saved-recipes">
        <h2>Saved Recipes</h2>
            <ul className="recipe-list">
                {saved.map((recipe)=>(
                    
                    <li key={recipe._id} className='saved-recipe-card'>
                        <img src={recipe.image} alt={recipe.title} />
                        <h3>{recipe.title}</h3>
                        <div className='btns'>
                            <button onClick={()=>handleDelete(recipe._id)}>Remove</button>
                            <button onClick={()=>handleDetail(recipe)}>Details</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SavedRecipes;