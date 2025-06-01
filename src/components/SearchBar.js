import React from "react";
import { useState } from "react";
import axios from 'axios';


const SearchBar =({onResults,setLoading})=>{
    const [query,setQuery]=useState('');

    const handleSearch = async(e)=>{
        e.preventDefault();
        if (!query) return;

        setLoading(true);
        try {
            const response= await axios.get('https://api.spoonacular.com/recipes/findByIngredients',{
                params:{
                    apiKey:process.env.REACT_APP_API_KEY,
                    ingredients:query,
                    number:24
                }
            });
            onResults(response.data)
        } catch (error) {
            console.log("Error fetching recipes",error);
        }finally{
            setLoading(false);
        }
        
    };

    return(

        <div className="search-bar">
        <div className="header">
            <h2>Let's Find Some Food</h2>
        </div>
        
        <form onSubmit={handleSearch} className="search-form">
                <input
                type="text"
                placeholder="Enter ingredients (comma-separated)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-bar-input"
                />
                <button type="submit" className="search-button"><img src="loupe.png" alt="search"/></button> 
        </form>
        </div>
    );
};
    
//<a href="https://www.flaticon.com/free-icons/search" title="search icons">Search icons created by Freepik - Flaticon</a>
   


export default SearchBar;

