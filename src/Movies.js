import { useState, useEffect } from 'react';
import MovieElement from './MovieElement';
import MovieDetailedElement from './MovieDetailedElement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDice, faArrowLeft, faArrowRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

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
        setErrorMessage('')
        // eslint-disable-next-line
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
                console.log(`Invalid ID: ${randomImdbID}, retrying...`);
                return randomMovie();
            } else {
                console.log(`Valid ID: ${randomImdbID}, success!`);
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
            setErrorMessage('Fix your query')
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
        <div className='container' id="containerDiv">
            <div className="row">
                <div className="col-sm">
                    <input className="form-control"
                        placeholder="ID"
                        onChange={(e) => setUserIDInput(e.target.value)}
                        onKeyDown={handlePress}
                    ></input>
                </div>
                <div className="col-sm">
                    <input className="form-control"
                        placeholder="Title"
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={handlePress}
                    ></input>
                </div>
                <div className="col-sm">
                    <input className="form-control"
                        placeholder="Type"
                        onChange={(e) => setUserTypeInput(e.target.value)}
                        onKeyDown={handlePress}
                    ></input>
                </div>
                <div className="col-sm">
                    <input className="form-control"
                        placeholder="Year"
                        onChange={(e) => setUserYearInput(e.target.value)}
                        onKeyDown={handlePress}
                    ></input>
                </div>
                <div className="col-sm">
                    <button className='btn btn-light' onClick={sendQuery}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>

                    <button className='btn btn-light' onClick={randomMovie}><FontAwesomeIcon icon={faDice} /></button>

                    <button className='btn btn-light' disabled={movieResults === null || movieResults.Actors || currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    </button>

                    <button className='btn btn-light' disabled={movieResults === null  || movieResults.Actors } onClick={() => setCurrentPage(currentPage + 1)}>
                    <FontAwesomeIcon icon={faArrowRight} />
                    </button> 
                </div>
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
            ): <div className="mx-auto custom-container p-4 text-center"><h3>{errorMessage}</h3></div>}
        </div>
    );
}

            
            
export default Movies;
