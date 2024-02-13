import Card from 'react-bootstrap/Card'

function MovieElement(props) {
    const styles = { 
        width: '16rem', 
        marginRight: '2rem', 
        marginLeft: '2rem', 
        marginTop: '2rem', 
        marginBottom: '1rem'
    }

    return (<>
            <Card style={styles}>
                <Card.Img variant="top" src={props.myResults.Poster} style={{marginTop: '1rem'}}/>
                <Card.Body>
                    <Card.Title>{props.myResults.Title}</Card.Title>
                    <Card.Text>{props.myResults.Year}</Card.Text>
                    <Card.Text>{props.myResults.imdbID}</Card.Text>
                    <Card.Text>{props.myResults.Type}</Card.Text>
                </Card.Body>
            </Card>
        </>
      )
}

export default MovieElement