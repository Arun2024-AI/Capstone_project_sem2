import { Link, useLocation } from "react-router-dom"

import { useState } from "react"
import Sidebar from "./Sidebar"

import { faHome, faList, faCog, faSearch, faMicrophone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Navbar(){
    const [showSidebar, setShowSidebar] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [isListening, setIsListening] = useState(false)
    const location = useLocation()
    const links = [
        {
            name: "Home",
            path: "/",
            icon: faHome
        },
        {
            name: "Recipes",
            path: "/recipes",
            icon: faList
        },
        {
            name: "Settings",
            path: "/settings",
            icon: faCog
        }
    ]

    function closeSidebar(){
        setShowSidebar(false)
    }

    const startListening = () => {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new window.webkitSpeechRecognition()
            recognition.continuous = false
            recognition.interimResults = false

            recognition.onstart = () => {
                setIsListening(true)
            }

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript
                setSearchQuery(transcript)
                setIsListening(false)
            }

            recognition.onerror = () => {
                setIsListening(false)
            }

            recognition.onend = () => {
                setIsListening(false)
            }

            recognition.start()
        } else {
            alert("Speech recognition is not supported in your browser")
        }
    }

    return (
        <>
            <div className="navbar container">
                <Link to="/" className="logo">F<span>oo</span>diesHub</Link>
                <div className="search-container">
                    <div className="search-box">
                        <FontAwesomeIcon icon={faSearch} className="search-icon" />
                        <input 
                            type="text" 
                            placeholder="Search recipes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button 
                            className={`mic-button ${isListening ? 'listening' : ''}`}
                            onClick={startListening}
                        >
                            <FontAwesomeIcon icon={faMicrophone} />
                        </button>
                    </div>
                </div>
                <div className="nav-links">
                    { links.map(link => (
                        <Link className={location.pathname === link.path ? "active" : ""} to={link.path} key={link.name}>{link.name}</Link>
                    )) }
                </div>
                <div onClick={() => setShowSidebar(true)} className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
            { showSidebar && <Sidebar close={closeSidebar} links={links} /> }
        </>
    )
}