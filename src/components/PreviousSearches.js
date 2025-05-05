import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

export default function PreviousSearches({ onSearch }){
    const [searchTerm, setSearchTerm] = useState("")
    const [previousSearches, setPreviousSearches] = useState(['pizza', 'burger', 'cookies', 'juice', 'biriyani'])

    const handleSearch = () => {
        if (searchTerm.trim()) {
            onSearch(searchTerm)
            if (!previousSearches.includes(searchTerm.toLowerCase())) {
                setPreviousSearches(prev => [searchTerm.toLowerCase(), ...prev.slice(0, 4)])
            }
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <div className="previous-searches section">
            <h2>Previous Searches</h2>
            <div className="previous-searches-container">
                {previousSearches.map((search, index) => (
                    <div 
                        key={index} 
                        style={{animationDelay: index * .1 + "s"}} 
                        className="search-item"
                        onClick={() => {
                            setSearchTerm(search)
                            onSearch(search)
                        }}
                    >
                        {search}
                    </div>
                ))}
            </div>
            <div className="search-box">
                <input 
                    type="text" 
                    placeholder="Search recipes..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button className="btn" onClick={handleSearch}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        </div>
    )
}