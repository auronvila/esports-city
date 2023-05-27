import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound(){
    return(
        <Segment placeholder>
            <Header icon >
                <Icon name="search" />
                Oops - we have looked everywhere but could not find the content you've looking for?
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/activities'>
                    Return to activities page
                </Button>
            </Segment.Inline>
        </Segment>
    )
}