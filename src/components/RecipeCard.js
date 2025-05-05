import CustomImage from "./CustomImage"
import { useState } from "react"

export default function RecipeCard({recipe}){
    const [showDetails, setShowDetails] = useState(false)

    return (
        <div className="recipe-card">
            <CustomImage imgSrc={recipe.image} pt="65%"/>
            <div className="recipe-card-info">
                <p className="recipe-title">{recipe.title}</p>
                <p className="recipe-category">{recipe.category} • {recipe.area}</p>
                {showDetails ? (
                    <>
                        <p className="recipe-desc">{recipe.instructions}</p>
                        <button className="view-btn" onClick={() => setShowDetails(false)}>SHOW LESS</button>
                    </>
                ) : (
                    <button className="view-btn" onClick={() => setShowDetails(true)}>VIEW RECIPE</button>
                )}
            </div>
        </div>
    )
}