import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

import * as utils from './utils'
import Views from './views'

const SignUp = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repeat_password, setRepeat_password] = useState('')
    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [email, setEmail] = useState('')
    const [post_code, setPost_code] = useState('')
    const [additional, setAdditional] = useState('')

    const validateForm = () => {
        return username.length > 0 &&
               password.length > 0 &&
               repeat_password.length > 0 &&
               first_name.length > 0 &&
               email.length > 0 &&
               post_code.length > 0 &&
               password == repeat_password
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const result = await utils.signup({
            username: username,
            password: password,
            repeat_password: repeat_password,
            first_name: first_name,
            last_name: last_name,
            email: email,
            post_code: post_code,
            additional: additional
        })
    }

    return (
        <Row>
            <Col />
            <Col className='d-grid'>
                <Row className='justify-content-md-center'>
                    <Col sm={4} md='auto'>
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
                        <Form.Group className='mb-3' controlId='repeat_password'>
                            <Form.Label className='font-weight-bold'>Repeat Password</Form.Label>
                            <Form.Control
                                type='password'
                                value={repeat_password}
                                onChange={(e) => setRepeat_password(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='email'>
                            <Form.Label className='font-weight-bold'>Email</Form.Label>
                            <Form.Control
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col sm={4} md='auto'>
                        <Form.Group className='mb-3' controlId='first_name'>
                            <Form.Label className='font-weight-bold'>First Name</Form.Label>
                            <Form.Control
                                type='name'
                                value={first_name}
                                onChange={(e) => setFirst_name(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='last_name'>
                            <Form.Label className='font-weight-bold'>Last Name</Form.Label>
                            <Form.Control
                                type='name'
                                value={last_name}
                                onChange={(e) => setLast_name(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='post_code'>
                            <Form.Label className='font-weight-bold'>Post Code</Form.Label>
                            <Form.Control
                                type='postcode'
                                value={post_code}
                                onChange={(e) => setPost_code(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='additional'>
                            <Form.Label className='font-weight-bold'>Additional information</Form.Label>
                            <Form.Control
                                type='text'
                                value={additional}
                                onChange={(e) => setAdditional(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Row className='justify-content-md-center'>
                        <Col sm={4} md={5} className='d-grid'>
                            <Button flex onClick={(e) => handleSubmit(e)} disabled={!validateForm()}>
                                Sign up
                            </Button>
                            <p className='text-center'>Already have an account?</p>
                            <Button onClick={() => props.state.setCurrent_view(Views.login(props.state)) }>
                                Log in
                            </Button>
                        </Col>
                    </Row>
                </Row>
            </Col>
            <Col />
        </Row>
    )
}

export default SignUp