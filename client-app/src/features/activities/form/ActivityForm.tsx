import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useParams,useNavigate } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Link } from 'react-router-dom';
import {v4 as uuid} from 'uuid';


export default observer(function ActivityForm() {


    const {activityStore} = useStore()
    const {selectedActivities : selectedActivity, closeForm 
        ,createActivity,editActivity,loading, loadActivity,loadingInitial} = activityStore;

        const {id} = useParams();
        const navigate = useNavigate();

        const [activity, setActivity] = useState<Activity >({
            id: '',
            title: '',
            category: '',
            description: '',
            date: '',
            city: '',
            venue: ''
        })

        useEffect(() => {
            if (id) loadActivity(id).then(activity => setActivity(activity!))
        },[id,loadActivity])



    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        if(!activity.id){
            activity.id = uuid();
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }else{
            editActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        
        const {name,value} = event.target;
        setActivity({...activity, [name]: value});
    }

    if (loadingInitial) return <LoadingComponent content='Loading activity...'/>

    console.log()
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
                    <Button as={Link} to='/activities' onClick={closeForm} floated='right' type='button' content='Cancel' />
                </Form>
        </Segment>
    )
})