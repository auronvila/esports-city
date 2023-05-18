import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activity: Activity | undefined;
    closeForm:() => void;
}

export default function ActivityForm({closeForm,activity}:Props) {
    return (
        <Segment clearing>
                <Form>
                    <Form.Input placeholder='Title' />
                    <Form.Input placeholder='Description' />
                    <Form.Input placeholder='Category' />
                    <Form.Input placeholder='Date' />
                    <Form.Input placeholder='City' />
                    <Form.Input placeholder='Venue' />
                    <Button floated='right' type='submit' positive content='Submit' />
                    <Button onClick={closeForm} floated='right' type='submit' content='Cancel' />
                </Form>
        </Segment>
    )
}