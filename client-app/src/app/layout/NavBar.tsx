import { Button, Container, Menu, Image, Dropdown } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../stores/store';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';


export default observer(function NavBar() {

  const {userStore: {user, logout}} = useStore();

    return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header as={NavLink} to='/'>
        <img src="/Assets/categoryImages/logo.png" alt="logo" style={{marginRight: '10px'}}/>
          Reactivities
        </Menu.Item>
        <Menu.Item as={NavLink} to='/activities' name='Activities' />
        <Menu.Item as={NavLink} to='/erros' name='Errors' />
        <Menu.Item>
          <Button as={NavLink} to='/createActivity' positive content='Create Activity' />
        </Menu.Item>
        <Menu.Item position='right'>
            <Image src={user?.Image || '/user.png'} avatar spaced='right' />
            <Dropdown pointing='top left' text={user?.displayName}>
              <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={`/profile/${user?.username}`} text='My Profile' icon='user'/>
                    <Dropdown.Item onClick={logout} text='Logout' icon='power' />
              </Dropdown.Menu>
            </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>


    )
})