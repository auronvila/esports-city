import React, { ChangeEvent } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activity: Activity | undefined;
    closeForm:() => void;
    createOrEditActivity:(activity:Activity) => void;
}

export default function ActivityForm({createOrEditActivity, closeForm, activity : selectedActivity}:Props) {

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

    function handleSubmit() {
        createOrEditActivity(activity);
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
                    <Form.Input placeholder='Date' onChange={handleInputChange} value={activity.date} name='date'/>
                    <Form.Input placeholder='City' onChange={handleInputChange} value={activity.city} name='city'/>
                    <Form.Input placeholder='Venue' onChange={handleInputChange} value={activity.venue} name='venue'/>
                    <Button floated='right' type='submit' positive content='Submit' />
                    <Button onClick={closeForm} floated='right' type='submit' content='Cancel' />
                </Form>
        </Segment>
    )
}