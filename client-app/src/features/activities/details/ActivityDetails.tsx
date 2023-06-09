import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedSideBar from './ActivityDetailedSideBar';


export default observer(function ActivityDetails() {

    const {activityStore} = useStore();
    const {id} = useParams();
    const {selectedActivities : activity, openForm, cancelSelectedActivity : cancelSelectActivity, loadActivity,loadingInitial,closeForm} = activityStore;


    useEffect(() => {
        if(id) loadActivity(id)
    },[id,loadActivity])


    if ( loadingInitial || !activity) return <LoadingComponent/> //not displaying anything just returning some valid JSX othervise will display an error;


    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity}/>
                <ActivityDetailedInfo activity={activity}/>
                <ActivityDetailedChat/>
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSideBar/>
            </Grid.Column>
        </Grid>
    )
})