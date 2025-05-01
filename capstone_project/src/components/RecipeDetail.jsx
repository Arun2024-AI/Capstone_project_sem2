// import React from 'react';

// function RecipeDetail({ meal }) {
//   const getIngredients = () => {
//     let ingredients = [];
//     for (let i = 1; i <= 20; i++) {
//       const ingredient = meal[`strIngredient${i}`];
//       const measure = meal[`strMeasure${i}`];
//       if (ingredient && ingredient.trim()) {
//         ingredients.push(`${ingredient} - ${measure}`);
//       }
//     }
//     return ingredients;
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>{meal.strMeal}</h2>
//       <img src={meal.strMealThumb} alt={meal.strMeal} width="300" style={{ borderRadius: '10px' }} />
      
//       <h3>Ingredients:</h3>
//       <ul>
//         {getIngredients().map((item, idx) => (
//           <li key={idx}>{item}</li>
//         ))}
//       </ul>

//       <h3>Instructions:</h3>
//       <p style={{ textAlign: 'justify' }}>{meal.strInstructions}</p>

//       <h3>Prep Time:</h3>
//       <p>30-45 minutes (estimated)</p>

//       <h3>Nutritional Information (Mocked):</h3>
//       <ul>
//         <li>Calories: 450 kcal</li>
//         <li>Protein: 25g</li>
//         <li>Carbs: 50g</li>
//         <li>Fat: 20g</li>
//       </ul>
//     </div>
//   );
// }

// export default RecipeDetail;
