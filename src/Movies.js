import { useState, useEffect } from 'react';
import MovieElement from './MovieElement';
import MovieDetailedElement from './MovieDetailedElement';
function Movies() {
    const API_KEY = '7b24a2fe';
    const [userInput, setUserInput] = useState('');
    const [userTypeInput, setUserTypeInput] = useState('');
    const [userYearInput, setUserYearInput] = useState('');
    const [userIDInput, setUserIDInput] = useState('');
    const [movieResults, setMovieResults] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        sendQuery();
    }, [currentPage]);

    function checkTypeInput() {
        const allowedTypes = ['movie', 'game', 'episode', 'series'];
        return userTypeInput === '' || allowedTypes.includes(userTypeInput.trim().toLowerCase())
    }

    function checkYearInput() {
        return userYearInput === '' || (/^\d{4}$/).test(userYearInput)
    }

    function checkIDInput() {
        return userIDInput.startsWith('tt')
    }

    function checkInput() {
        return (/^[^\s]{1,}$/).test(userInput);
    }
    
    function sendQuery() {
        // Case 1: Title and Year and/or Type only 
        if (checkInput() && checkYearInput() && checkTypeInput() && userIDInput.length === 0) {
            requestData()
        }
        // Case 2: ID only
        else if (userInput.length + userTypeInput.length + userYearInput.length === 0 && checkIDInput()) {
            requestData()
        }
        // Error
        else {
            console.log('fix your query')
        }
    }

    function requestData() {
        const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${userInput}&i=${userIDInput}&page=${currentPage}&type=${userTypeInput}&y=${userYearInput}`;
        fetch(API_URL)
            .then(response => response.json())
            .then(json => setMovieResults(json))
            .catch(error => console.error(error));
    }

    return (
        <div>
            <div className='div1'>
                <input
                    placeholder="ID"
                    onChange={(e) => setUserIDInput(e.target.value)}
                ></input>
                <input
                    placeholder="Title"
                    onChange={(e) => setUserInput(e.target.value)}
                ></input>
                <input
                    placeholder="Type"
                    onChange={(e) => setUserTypeInput(e.target.value)}
                ></input>
                <input
                    placeholder="Year"
                    onChange={(e) => setUserYearInput(e.target.value)}
                ></input>
                <button onClick={sendQuery}>🔎</button>
            </div>
            <div className="div2">
                {movieResults && movieResults.Response !== 'False' && movieResults.Actors == null &&
                    movieResults.Search.slice(0, 5).map(item => (
                        <MovieElement myResults={item}></MovieElement>
                    ))}
                {movieResults && movieResults.Response !== 'False' && movieResults.Actors &&
                    <MovieDetailedElement myResults={movieResults}></MovieDetailedElement>
                    }
            </div>
            {movieResults && movieResults.Response !== 'False' && movieResults.Actors == null && (
                <div className='div1'>
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                        ⬅
                    </button>
                    <button disabled={currentPage === 5} onClick={() => setCurrentPage(currentPage + 1)}>
                        ➡
                    </button>
                </div>
            )}
        </div>
    );
}

            
            
export default Movies;
