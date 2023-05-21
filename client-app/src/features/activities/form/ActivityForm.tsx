import React, { ChangeEvent } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';


export default observer(function ActivityForm() {


    const {activityStore} = useStore()
    const {selectedActivities : selectedActivity, closeForm ,createActivity,editActivity,loading} = activityStore;

    const intialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = React.useState(intialState);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        activity.id ? editActivity(activity) : createActivity(activity)
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        
        const {name,value} = event.target;
        setActivity({...activity, [name]: value});
    }

    return (
        <Segment clearing>
                <Form autoComplete = 'off' onSubmit={handleSubmit}>
                    <Form.Input placeholder='Title' onChange={handleInputChange} value={activity.title} name='title'  />
                    <Form.Input placeholder='Description'onChange={handleInputChange} value={activity.description} name='description' />
                    <Form.Input placeholder='Category' onChange={handleInputChange} value={activity.category} name='category' />
                    <Form.Input type='date' placeholder='Date' onChange={handleInputChange} value={activity.date} name='date'/>
                    <Form.Input placeholder='City' onChange={handleInputChange} value={activity.city} name='city'/>
                    <Form.Input placeholder='Venue' onChange={handleInputChange} value={activity.venue} name='venue'/>
                    <Button loading={loading} floated='right' type='submit' positive content='Submit' />
                    <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
                </Form>
        </Segment>
    )
})