import React, { useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import * as utils from './utils'

const Banned = () => {
    return (
        <Row>
            <Col />
            <Col className='justify-content-md-center' sm={4} md='auto'>
                <Card>
                    <Card.Body className='border border-danger'>
                        <Card.Title>Your account is banned</Card.Title>
                        <Card.Text>Reason: { utils.getBanReason() }</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col />
        </Row>
    )
}

export default Banned