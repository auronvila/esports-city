import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

export default observer(function HomePage(){
    const {userStore, modalStore} = useStore();

    return(
        <Segment inverted textAlign="center" vertical className="masthead" >
            <Container text >
                <Header as='h1'>
                    <Image size="massive" src='/Assets/categoryImages/logo.png' alt='logo' style={{marginBottom: 12}} />
                    Reactivities
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                    <Header as='h2' inverted content='Welcome To Reactivities' />
                    <Button as={Link} size='huge' inverted to='/activities' content='Go to Activities' />
                    </>
                ): (
                    <>
                    <Button onClick={() => modalStore.openModal(<LoginForm  />)} content='Login' color="teal" />
                    <Button onClick={() => modalStore.openModal(<RegisterForm/>)} content='Register' />
                    </>
                )}
            </Container>
        </Segment>

    )
})