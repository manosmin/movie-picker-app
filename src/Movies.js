import { useState, useEffect } from 'react';
import MovieElement from './MovieElement';

function Movies() {
    const API_KEY = '7b24a2fe';
    const [userInput, setUserInput] = useState('');
    const [userTypeInput, setUserTypeInput] = useState('');
    const [userYearInput, setUserYearInput] = useState('');
    const [movieResults, setMovieResults] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        sendQuery();
    }, [currentPage]);

    function sendQuery() {
        const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${userInput}&page=${currentPage}&type=${userTypeInput}&y=${userYearInput}`;
        fetch(API_URL)
            .then(response => response.json())
            .then(json => setMovieResults(json))
            .catch(error => console.error(error));
    }

    return (
        <div>
            <div className='div1'>
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
                {movieResults && movieResults.Response !== 'False' &&
                    movieResults.Search.slice(0, 5).map(item => (
                        <MovieElement myResults={item}></MovieElement>
                    ))}
            </div>
            {movieResults && movieResults.Response !== 'False' && (
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
