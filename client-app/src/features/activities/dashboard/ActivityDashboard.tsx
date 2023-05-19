import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface Props {
    activities:Activity[];
    selectedActivity:Activity | undefined;
    selectActivity:(id:string) => void;
    cancelSelectActivity:() => void;
    editMode:boolean;
    openForm:(id:string) => void;
    closeForm:() => void;
    createOrEditActivity:(activity:Activity) => void;
    deleteActivity:(id:string) => void;
    submiting:boolean;
}

export default function ActivityDashboard({submiting,deleteActivity,createOrEditActivity,activities,selectedActivity,selectActivity,cancelSelectActivity,editMode,openForm,closeForm}:Props) {
    return (
        <Grid>
            <Grid.Column width='10' >
                <ActivityList 
                activities={activities} 
                selectActivity={selectActivity}
                deleteActivity={deleteActivity}
                submitting={submiting}
                />
            </Grid.Column>


            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails
                 activity={selectedActivity}
                 cancelSelectActivity={cancelSelectActivity}
                 openForm={openForm}
                 />}

                 {editMode &&
                <ActivityForm
                 submiting={submiting} 
                 closeForm={closeForm} 
                 activity={selectedActivity} 
                 createOrEditActivity={createOrEditActivity} />}
            </Grid.Column>
        </Grid>
    )
}