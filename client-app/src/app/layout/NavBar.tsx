import { Button, Container, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';


export default function NavBar({ }) {

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
  </Container>
</Menu>


    )
}