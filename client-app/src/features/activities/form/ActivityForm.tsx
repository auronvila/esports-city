import React, { ChangeEvent } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activity: Activity | undefined;
    closeForm:() => void;
    createOrEditActivity:(activity:Activity) => void;
    submiting:boolean;
}

export default function ActivityForm({submiting = true ,createOrEditActivity, closeForm, activity : selectedActivity}:Props) {

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
        event.preventDefault();
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
                    <Form.Input type='date' placeholder='Date' onChange={handleInputChange} value={activity.date} name='date'/>
                    <Form.Input placeholder='City' onChange={handleInputChange} value={activity.city} name='city'/>
                    <Form.Input placeholder='Venue' onChange={handleInputChange} value={activity.venue} name='venue'/>
                    <Button loading={submiting} floated='right' type='submit' positive content='Submit' />
                    <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
                </Form>
        </Segment>
    )
}