import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";

export default function HomePage(){
    return(
        <Segment inverted textAlign="center" vertical className="masthead" >
            <Container text >
                <Header as='h1'>
                    <Image size="massive" src='/client-app/public/Assets/logo.png' alt='logo' style={{marginBottom: 12}} />
                    Reactivities
                </Header>
                <Header as='h2' inverted content='Welcome To Reactivities' />
                <Button as={Link} size='huge' inverted to='/activities' content='Teak me to the Activities' />
            </Container>
        </Segment>

    )
}