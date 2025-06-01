import React, {useState,useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from 'react-toastify';


const RecipePage =() => {
    const {id} = useParams();
    const [recipe,setRecipe]= useState(null);
    const [loading,setLoading]= useState(true);
    const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";


    //getting the recipe
    useEffect(() => {
      const fetchDetail = async () => {
        try {
            const res = await axios.get( `https://api.spoonacular.com/recipes/${id}/information`,
                {
                  params: {
                    apiKey: process.env.REACT_APP_API_KEY
                  }
                });
                setRecipe(res.data);
                setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
      };
      fetchDetail();
    },[id]);
    //saving logic from the recipeList - if anything is wrong with this its related to this component not the save logic it worked in recipe list
    const handleSave= async(recipe)=>{

        const token = localStorage.getItem('token');
        const ingredients= recipe.extendedIngredients?.map(i=>({name:i.name,amount:i.amount}));
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
    
    if(loading) return <div className="loader"><ClipLoader color="#36d7b7" loading={true} size={100} /></div>;
    if(!recipe) return <p>Recipe not found !!</p>;

    return (
        <div className="recipe-details">

            <div className="info">
                <img src={recipe.image} alt={recipe.title} />
                <h2>{recipe.title}</h2>
                <button onClick={()=>handleSave(recipe)}>Save</button>
            </div>
            <div className="recipe-meta">
                <h5>Servings: {recipe.servings}</h5>
                <h5>Time to Make: {recipe.readyInMinutes}</h5>
                <h5>Price Per Serving: {recipe.pricePerServing}</h5>
            </div>
            <div className="recipe-ingredients">
                <h3>Ingredients</h3>
                <ul>
                    {recipe.extendedIngredients.map((i,index)=>(
                        <li key={index}>{i.original}</li>
                    ))}
                </ul>
            </div>            
            <div className="recipe-instructions">
            <h3>Instructions</h3>
                <ol>
                    {recipe.instructions
                    ?.replace(/<[^>]+>/g, '') // regex to Remove all HTML tags like <ol>, <li>, etc.
                    .split(/\.(?:\s+|\n|$)/)  
                    .map(step => step.trim())
                    .filter(step => step.length > 0)
                    .map((step, index) => (
                        <li key={index}>{step}.</li>
                    ))}
                </ol>
            </div>
        </div>
    )
};
export default RecipePage;
