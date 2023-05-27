import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import MytextInput from "../../app/common/form/MytextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { error } from "console";

export default observer(function LoginForm(){

    const {userStore} = useStore()


    return(
        <Formik
        initialValues={{email: '', password: '',error :null,}}
        onSubmit={(values, {setErrors}) => userStore.login(values).catch(error => setErrors({error: 'Invalid Email or Password'}))}
        >
            {({handleSubmit, isSubmitting, errors}) => (
                <Form className="ui form"
                onSubmit={handleSubmit}
                autoComplete='off'
                >
                    <Header as='h2' content='Login to Reactivities' color="teal" textAlign="center" />
                    <MytextInput placeholder="Email" name="email" />
                    <MytextInput placeholder="Password" name="password" type='password' />
                    <ErrorMessage name="error" render={() => 
                    <Label style={{marginBottom: 10}} basic color="red" content={errors.error} />}
                    />
                    <Button loading={isSubmitting} positive content='Login' type="submit" fluid />
                </Form>
            )}
        </Formik>

    )
})