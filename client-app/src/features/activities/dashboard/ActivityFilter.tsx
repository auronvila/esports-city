import Calendar from 'react-calendar'
import { Header, Menu } from 'semantic-ui-react'

export default function ActivityFilter() {
    return(
        <>
        <Menu vertical size='large' style={{width:'100%', marginTop: 28 }} >
            <Header icon='filter' color='teal' attached content='Filters'/>
            <Menu.Item content='All Activities' />
            <Menu.Item content="I'm Going" />
            <Menu.Item content="I'm Hosting" />
        </Menu>
        <Header/>
        <Calendar/>
        </>
    )
}