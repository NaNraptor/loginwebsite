import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import * as utils from './utils'
import Views from './views'

const _404 = (props) => {
    const onGoBack = () => {
        utils.reset404()
        window.history.replaceState(null, '', '/')
        props.state.setCurrent_view(Views.dashboard(props.state))
    }

    return (
        <Row>
            <Col />
            <Col className='justify-content-md-center' sm={4} md='auto'>
                <Card>
                    <Card.Body className='border border-warning'>
                        <Card.Title>This page does not exist</Card.Title>
                        <Card.Text>Want to go back?</Card.Text>
                        <Button onClick={() => onGoBack() }>
                                Go back
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
            <Col />
        </Row>
    )
}

export default _404