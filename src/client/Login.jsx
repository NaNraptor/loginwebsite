import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

import * as utils from './utils'
import Views from './views'

const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [login_alert, setLogin_alert] = useState(<div />)

    const validateForm = () => {
        return username.length > 0 && password.length > 0
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        utils.deleteAllCookies()
        const result = await utils.login({ username: username, password: password })

        if (!result.success) {
            return setLogin_alert(<Alert className='mt-1' key={ 'danger' } variant={ 'danger' }> Log in failed. Please try again. </Alert>)
        }

        setLogin_alert(<Alert className='mt-1' key={ 'success' } variant={ 'success' }> Log in successful. Please await redirect. </Alert>)
        if (utils.isBanned()) {
            return props.state.setCurrent_view(Views.banned(props.state))
        }
        props.state.setCurrent_view(Views.dashboard(props.state))
    }

    return (
        <Row>
            <Col />
            <Col className='justify-content-md-center' sm={4} md='auto'>
                <Form onSubmit={handleSubmit} className='d-grid'>
                    <Form.Group className='mb-3' controlId='username'>
                        <Form.Label className='font-weight-bold'>Username</Form.Label>
                        <Form.Control
                            autoFocus
                            type='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='password'>
                        <Form.Label className='font-weight-bold'>Password</Form.Label>
                        <Form.Control
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='rememberme'>
                        <Form.Check type='checkbox' label='Remember me' onClick={(e) => utils.remember_me({ remember_me: e.target.checked })}/>
                    </Form.Group>
                    <Button className='mb-3' type='submit' disabled={!validateForm()}>
                        Log in
                    </Button>
                    {login_alert}
                    <p className='text-center'>Don&apos;t have an account?</p>
                    <Button onClick={() => props.state.setCurrent_view(Views.signup(props.state)) }>
                        Sign up
                    </Button>
                </Form>
            </Col>
            <Col />
        </Row>
    )
}

export default Login