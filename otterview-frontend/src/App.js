import './App.css';
import {Container, Row, Col} from 'reactstrap';
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render () {
        return (
            <Row>
                <Col className="black-box">Hello</Col>
                <Col className="normal-box">Hello</Col>
            </Row>
        )
    }
}

export default App;
