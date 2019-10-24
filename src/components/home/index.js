import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import './home.css';

class home extends Component {
    render() {
        return (
            <Container className="container">
                <Row>
                    <Col xs="6" className="Col"><Link to={{ pathname: "/analista" }}><Button color="warning">Analista</Button></Link></Col>
                    <Col xs="6" className="Col"><Link to={{ pathname: "/gestor" }}> <Button color="warning">Gestor</Button> </Link></Col>
                </Row>
            </Container>
        )
    }
}
export default home;
