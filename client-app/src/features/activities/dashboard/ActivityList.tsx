import React, { SyntheticEvent, useState } from 'react';
import { Activity } from '../../../app/models/activity';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { SynthesizedComment } from 'typescript';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function ActivityList() {

    const {activityStore} = useStore()

    const {activitiesBydate,deleteActivity,loading} = activityStore

    const [target, setTarget] = useState('');

    function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteActivity(id)

    }

    return(
        <Segment>
            <Item.Group divided>
                {activitiesBydate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                                <Item.Meta>
                                    {activity.date}
                                </Item.Meta>
                                <Item.Description>
                                    <div>
                                        {activity.description}
                                    </div>
                                    <div>
                                        {activity.city}
                                    </div>
                                    <div>
                                        {activity.venue}
                                    </div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button onClick={() => activityStore.selectActivity(activity.id)} floated='right' content='View' color='blue' />
                                    <Button 
                                     loading={loading && target === activity.id} 
                                     onClick={(e) => handleActivityDelete(e,activity.id)} 
                                     floated='right' 
                                     content='Delete' 
                                     color='red' 
                                     name={activity.id}
                                     />
                                    <Label basic content={activity.category} />
                                </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})