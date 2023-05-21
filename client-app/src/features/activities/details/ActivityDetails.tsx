import React from 'react';
import { Button, Card, Icon, Image, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';


export default function ActivityDetails() {

    const {activityStore} = useStore();

    const {selectedActivities : activity, openForm, cancelSelectedActivity : cancelSelectActivity} = activityStore;

    if (!activity) return <LoadingComponent/> //not displaying anything just returning some valid JSX othervise will display an error;

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
                        <Button.Group widths={2}>
                            <Button onClick={() => openForm(activity.id)} basic color='blue' content='Edit' />
                            <Button onClick={() => cancelSelectActivity()} basic color='grey' content='Cancel' />
                    </Button.Group>
            </Card.Content>
      </Card>
    )
}