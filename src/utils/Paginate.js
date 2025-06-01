import React from 'react';

const Pagination =({recipesPerPage,totalRecipes,paginate}) => {
    const pageNumbers = []

    for (let i= 1 ; i<= Math.ceil(totalRecipes/recipesPerPage);i++){
        pageNumbers.push(i);
    };

    const handleClick = (number)=>{
      paginate(number);
      window.scrollTo({
        top:0,
        behavior: 'smooth'
      })
    }
    
    return (
        <nav className='paginate-nav'>
          {pageNumbers.map(number => (
            <button key={number} onClick={() => handleClick(number)} >
              {number}
            </button>
          ))}
        </nav>
      );
}
export default Pagination;