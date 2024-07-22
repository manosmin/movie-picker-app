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
    const [errorMessage, setErrorMessage] = useState('');
    const allowedTypes = ['movie', 'game', 'episode', 'series'];

    useEffect(() => {
        sendQuery();
        // eslint-disable-next-line
        setErrorMessage('')
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(1)
    }, [userInput, userTypeInput, userYearInput, userIDInput])

    const handlePress = e => {
        if(e.key === 'Enter') { 
         sendQuery()
        }
       }

    function checkTypeInput() {
        return userTypeInput === '' || allowedTypes.includes(userTypeInput.trim().toLowerCase())
    }

    function checkYearInput() {
        return userYearInput === '' || (/^\d{4}$/).test(userYearInput)
    }

    function checkIDInput() {
        return (/^tt\d{7}$/).test(userIDInput);
    }

    function checkInput() {
        return userInput.trim().length > 0;
    }

    function randomMovie() {
        setErrorMessage('');
        const randomImdbID = 'tt' + Math.floor(Math.random() * 10000000)
        const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${randomImdbID}`;
        fetch(API_URL)
            .then(response => response.json())
            .then(json => {if (json.Error) {
                setMovieResults(null);
                setErrorMessage(json.Error);
            } else {
                setErrorMessage('');
                setMovieResults(json);
            }})
            .catch(error => console.error(error));
    }
    
    function sendQuery() {
        if (checkInput() && checkYearInput() && checkTypeInput() && userIDInput.length === 0) {
            requestData()
        } else if (userInput.length + userTypeInput.length + userYearInput.length === 0 && checkIDInput()) {
            requestData()
        } else {
            setMovieResults(null)
            setErrorMessage('Fix your query.')
        }
    }

    function requestData() {
        setErrorMessage('');
        const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${userInput}&i=${userIDInput}&page=${currentPage}&type=${userTypeInput}&y=${userYearInput}`;
        fetch(API_URL)
            .then(response => response.json())
            .then(json => {if (json.Error) {
                setMovieResults(null);
                setErrorMessage(json.Error);
            } else {
                setErrorMessage('');
                setMovieResults(json);
            }})
            .catch(error => console.error(error));
    }

    return (
        <div className='container'>
            <div className='div1'>
                <input className="form-control"
                    placeholder="ID"
                    onChange={(e) => setUserIDInput(e.target.value)}
                    onKeyDown={handlePress}
                ></input>
                <input className="form-control"
                    placeholder="Title"
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={handlePress}
                ></input>
                <input className="form-control"
                    placeholder="Type"
                    onChange={(e) => setUserTypeInput(e.target.value)}
                    onKeyDown={handlePress}
                ></input>
                <input className="form-control"
                    placeholder="Year"
                    onChange={(e) => setUserYearInput(e.target.value)}
                    onKeyDown={handlePress}
                ></input>
                <button className='btn btn-light' onClick={sendQuery}>🔎</button>
                <button className='btn btn-light' onClick={randomMovie}>🎲</button>
                <button className='btn btn-light' disabled={movieResults === null || movieResults.Actors || currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                    ⬅️
                </button>
                <button className='btn btn-light' disabled={movieResults === null  || movieResults.Actors } onClick={() => setCurrentPage(currentPage + 1)}>
                    ➡️
                </button> 
            </div>
            {movieResults && movieResults.Response !== 'False' ? (
            <div className='container'>
                <div className='row justify-content-center'>
                {
                movieResults.Actors == null ? 
                movieResults.Search.map(item => (<MovieElement key={item.imdbID} myResults={item}></MovieElement>)) :
                <MovieDetailedElement myResults={movieResults}></MovieDetailedElement>}
                </div>
            </div>
            ): <h2 style={{marginTop: '25rem'}}>{errorMessage}</h2>}
        </div>
    );
}

            
            
export default Movies;
