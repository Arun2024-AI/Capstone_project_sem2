import { useState, useEffect } from "react"
import PreviousSearches from "../components/PreviousSearches"
import RecipeCard from "../components/RecipeCard"

export default function Recipes(){
    const [recipes, setRecipes] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        fetchRecipes()
    }, [searchTerm])

    const fetchRecipes = async () => {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
            const data = await response.json()
            setRecipes(data.meals || [])
        } catch (error) {
            console.error("Error fetching recipes:", error)
            setRecipes([])
        }
    }

    const handleSearch = (term) => {
        setSearchTerm(term)
    }

    return (
        <div>
            <PreviousSearches onSearch={handleSearch} />
            <div className="recipes-container">
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.idMeal} recipe={{
                        id: recipe.idMeal,
                        title: recipe.strMeal,
                        image: recipe.strMealThumb,
                        category: recipe.strCategory,
                        area: recipe.strArea,
                        instructions: recipe.strInstructions
                    }} />
                ))}
            </div>
        </div>
    )
}