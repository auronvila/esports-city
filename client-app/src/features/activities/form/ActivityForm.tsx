import { useEffect, useState } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useParams,useNavigate } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Link } from 'react-router-dom';
import { Formik,Form } from 'formik';
import * as Yup from 'yup';
import MytextInput from '../../../app/common/form/MytextInput';
import MyTextArea from '../../../app/common/form/MytextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/category.options';
import MyDateInput from './MyDateInput';
import {v4 as uuid} from 'uuid';


export default observer(function ActivityForm() {


    const {activityStore} = useStore()
    const {selectedActivities : selectedActivity, closeForm 
        ,createActivity,editActivity,loading, loadActivity,loadingInitial} = activityStore;

        const {id} = useParams();
        const navigate = useNavigate();

        const [activity, setActivity] = useState<Activity>({
            id: '',
            title: '',
            category: '',
            description: '',
            date: null,
            city: '',
            venue: ''
        })

        useEffect(() => {
            if (id) loadActivity(id).then(activity => setActivity(activity!))
        },[id,loadActivity])

        const validationSchema = Yup.object({
            title: Yup.string().required('The activity title is required'),
            description: Yup.string().required('The activity description is required'),
            category: Yup.string().required(),
            venue: Yup.string().required(),
            city: Yup.string().required(),
            date: Yup.string().required('Date is required'),
        })


    function handleFormSubmit(activity: Activity) {
        if(activity.id.length === 0 ){
            let newActivity ={
                ...activity,
                id : uuid()
            }
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }else{
            editActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }
    }


    if (loadingInitial) return <LoadingComponent content='Loading activity...'/>

    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal' />
            <Formik enableReinitialize 
            initialValues={activity} 
            onSubmit={values => handleFormSubmit(values)}
            validationSchema={validationSchema}
            >
                    {({handleSubmit ,isValid, isSubmitting, dirty }) => (
                            <Form className='ui form' autoComplete = 'off' onSubmit={handleSubmit}>
                                <MytextInput name='title' placeholder='title'/>
                                <MyTextArea rows={3} placeholder='Description'name='description' />
                                <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
                                <MyDateInput
                                placeholderText='Date' 
                                name='date' 
                                showTimeSelect 
                                timeCaption='time' 
                                dateFormat='MMMM d, yyyy h:mm aa'/>
                                <Header content='Location Details' sub color='teal' />
                                <MytextInput placeholder='City' name='city'/>
                                <MytextInput placeholder='Venue' name='venue'/>
                                <Button 
                                loading={loading} 
                                floated='right' 
                                type='submit' 
                                positive content='Submit' 
                                disabled = {isSubmitting || !dirty || !isValid}
                                />
                                <Button as={Link} to='/activities' onClick={closeForm} floated='right' type='button' content='Cancel' />
                            </Form>
                    )
                    }
            </Formik>

        </Segment>
    )
})