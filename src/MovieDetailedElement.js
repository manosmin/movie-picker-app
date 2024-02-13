import Card from 'react-bootstrap/Card'

function MovieDetailedElement(props) {

    function redirectToPage() {
        window.open(`https://www.imdb.com/title/${props.myResults.imdbID}`, '_blank');
    }

    return (<>
            <Card className='card2' onClick={redirectToPage}>
                <Card.Img variant="top" src={props.myResults.Poster} style={{marginTop: '1rem'}}/>
                <Card.Body>
                    <Card.Title>{props.myResults.Title}</Card.Title>
                    <Card.Text><b>Year: </b>{props.myResults.Year}</Card.Text>
                    <Card.Text><b>Actors: </b>{props.myResults.Actors}</Card.Text>
                    <Card.Text><b>Director: </b>{props.myResults.Director}</Card.Text>
                    <Card.Text><b>Writer: </b>{props.myResults.Writer}</Card.Text>
                    <Card.Text><b>Awards: </b>{props.myResults.Awards}</Card.Text>
                    <Card.Text><b>IMDB Rating: </b>{props.myResults.imdbRating}</Card.Text>
                    <Card.Text><b>Plot: </b>{props.myResults.Plot}</Card.Text>
                </Card.Body>
            </Card>
        </>
      )
}

export default MovieDetailedElement