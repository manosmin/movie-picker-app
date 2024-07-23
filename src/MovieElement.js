import { CardHeader, CardText, CardTitle } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'

function MovieElement(props) {

    function redirectToPage() {
        window.open(`https://www.imdb.com/title/${props.myResults.imdbID}`, '_blank');
    }


    return (<>
            <Card className='card1'>
                <CardHeader>
                    {props.myResults.Poster === 'N/A' ? <Card.Img onClick={redirectToPage} variant="top" src={process.env.PUBLIC_URL + '/placeholder.png'}/> : <Card.Img onClick={redirectToPage} variant="top" src={props.myResults.Poster}/>}
                </CardHeader>
                <Card.Body>
                    <CardTitle>{props.myResults.Title}</CardTitle>
                    <CardText>
                    {props.myResults.Year}<br></br>{props.myResults.Type}<br></br>{props.myResults.imdbID}
                    </CardText>
                </Card.Body>
            </Card>
        </>
      )
}

export default MovieElement