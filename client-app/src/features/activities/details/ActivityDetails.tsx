import React, { useEffect } from 'react';
import { Button, Card, Icon, Image, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';


export default observer(function ActivityDetails() {

    const {activityStore} = useStore();
    const {id} = useParams();
    const {selectedActivities : activity, openForm, cancelSelectedActivity : cancelSelectActivity, loadActivity,loadingInitial,closeForm} = activityStore;


    useEffect(() => {
        if(id) loadActivity(id)
    },[id,loadActivity])


    if ( loadingInitial || !activity) return <LoadingComponent/> //not displaying anything just returning some valid JSX othervise will display an error;


    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
                <Card.Content>
                 <Card.Header>{activity.title}</Card.Header>
                        <Card.Meta>
                                <span >{activity.date}</span>
                            </Card.Meta>
                            <Card.Description>
                                {activity.description}
                            </Card.Description>
                            </Card.Content>
                        <Card.Content extra>
                        <Button.Group floated='right' size='large' >
                            <Button close as={Link} to='/activities' size='large' basic color='grey' animated>
                                <Button.Content visible>Cancel </Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='cancel' />
                                    </Button.Content>
                            </Button>
                            <Button as={Link} to={`/manage/${activity.id}`} size='large' basic color='blue' animated>
                                <Button.Content visible>Edit</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='edit' />
                                    </Button.Content>
                            </Button>
                    </Button.Group>
            </Card.Content>
      </Card>
    )
})