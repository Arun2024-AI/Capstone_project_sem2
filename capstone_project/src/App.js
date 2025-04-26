import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch meals from the API
  const searchMeals = async () => {
    if (!query.trim()) {
      setError("Please enter or speak a meal name.");
      return;
    }

    setLoading(true); // Start loading state
    setMeals([]); // Clear previous meals before fetching new ones
    setError(""); // Reset error state
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await res.json();

      if (data.meals) {
        setMeals(data.meals);
        setError("");
        speakMealName(data.meals[0].strMeal);  // Speak the first meal name
      } else {
        setMeals([]);
        setError("No meals found.");
      }
    } catch (err) {
      console.error("API fetch error:", err);
      setError("Something went wrong while fetching data.");
    } finally {
      setLoading(false); // End loading state
    }
  };

  // 🎤 Voice recognition logic
  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onstart = () => {
      console.log("🎧 Listening...");
      setError("Listening... Speak now.");
    };

    recognition.onresult = (event) => {
      const spokenQuery = event.results[0][0].transcript;
      console.log("You said:", spokenQuery);
      setQuery(spokenQuery);
      setError(""); // Clear any previous error
      setTimeout(() => {
        searchMeals();
      }, 500);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setError("Voice recognition failed. Please try again.");
    };
  };

  // Function to speak the meal name using SpeechSynthesis
  const speakMealName = (mealName) => {
    const speech = new SpeechSynthesisUtterance(mealName);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="app">
      <h1>🎤 Recipe Finder</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search a meal (e.g., pasta, chicken)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchMeals}>Search</button>
        <button onClick={handleVoiceSearch}>🎙️ Speak</button>
      </div>

      {loading && <p className="loading">Loading recipes...</p>} {/* Show loading */}
      {error && <p className="error">{error}</p>} {/* Show error if any */}

      <div className="meal-list">
        {meals.length > 0 ? (
          meals.map((meal) => (
            <div key={meal.idMeal} className="meal-card">
              <h3>{meal.strMeal}</h3>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <p>{meal.strInstructions.substring(0, 100)}...</p>
            </div>
          ))
        ) : (
          <p>No meals found.</p>
        )}
      </div>
    </div>
  );
};

export default App;






