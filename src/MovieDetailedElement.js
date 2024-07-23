import { CardHeader, CardText, CardTitle } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'

function MovieDetailedElement(props) {

    function redirectToPage() {
        window.open(`https://www.imdb.com/title/${props.myResults.imdbID}`, '_blank');
    }

    return (<>
            <Card className='card2' >
                <CardHeader>
                {props.myResults.Poster === 'N/A' ? <Card.Img onClick={redirectToPage} variant="top" src={process.env.PUBLIC_URL + '/placeholder.png'}/> : <Card.Img onClick={redirectToPage} variant="top" src={props.myResults.Poster}/>}
                </CardHeader>
                <Card.Body>
                    <CardTitle>{props.myResults.Title}</CardTitle>
                    <CardText><b>Year: </b>{props.myResults.Year}<br></br><b>Writer: </b>{props.myResults.Writer}<br></br><b>Director: </b>{props.myResults.Director}<br></br><b>Actors: </b>{props.myResults.Actors}<br></br><b>Awards: </b>{props.myResults.Awards}<br></br><b>IMDb Rating: </b>{props.myResults.imdbRating}<br></br><b>Plot: </b>{props.myResults.Plot}</CardText>
                </Card.Body>
            </Card>
        </>
      )
}

export default MovieDetailedElement