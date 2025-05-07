import React, { useState, useRef, useEffect } from 'react';
import { TextField, IconButton, Box, Paper } from '@mui/material';
import { Search, Mic, MicOff } from '@mui/icons-material';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    // Cleanup timeout on unmount
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        handleSearch(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.start();
      setIsListening(true);
    } else {
      alert('Voice recognition is not supported in your browser.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleSearch = (searchQuery) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      if (searchQuery.trim()) {
        onSearch(searchQuery);
      }
    }, 500); // 500ms debounce
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      handleSearch(query);
    }
  };

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    handleSearch(newQuery);
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} className="search-bar">
      <Box className="search-input-container">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search recipes by ingredients..."
          value={query}
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <IconButton type="submit" color="primary">
                <Search />
              </IconButton>
            ),
            endAdornment: (
              <IconButton
                onClick={isListening ? stopListening : startListening}
                color={isListening ? 'error' : 'primary'}
              >
                {isListening ? <MicOff /> : <Mic />}
              </IconButton>
            ),
          }}
        />
      </Box>
    </Paper>
  );
}

export default SearchBar; 