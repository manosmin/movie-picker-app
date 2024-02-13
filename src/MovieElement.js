import Card from 'react-bootstrap/Card'

function MovieElement(props) {

    function redirectToPage() {
        window.open(`https://www.imdb.com/title/${props.myResults.imdbID}`, '_blank');
    }

    return (<>
            <Card className='card1' onClick={redirectToPage}>
                <Card.Img variant="top" src={props.myResults.Poster} style={{marginTop: '1rem'}}/>
                <Card.Body>
                    <Card.Title>{props.myResults.Title}</Card.Title>
                    <Card.Text><b>Year: </b>{props.myResults.Year}</Card.Text>
                    <Card.Text><b>ID: </b>{props.myResults.imdbID}</Card.Text>
                    <Card.Text><b>Type: </b>{props.myResults.Type}</Card.Text>
                </Card.Body>
            </Card>
        </>
      )
}

export default MovieElement