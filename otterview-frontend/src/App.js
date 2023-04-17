import './App.css';
import {Col, Row, Table} from 'reactstrap';
import React, {Component} from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-circular-progressbar/dist/styles.css';

class App extends Component {
    renderGradeCircle() {
        return (
            <GradeCircle/>
        )
    }

    renderTableHalf() {
        return (
            <TableHalf/>
        )
    }

    render () {
        return (
            <div className='height-setter'>
                <h1 className='page-head'>OtterView</h1>
                <h5 className='page-head'>An event sentiment analysis system.</h5>    

                <Row>
                    {this.renderTableHalf()}
                    {this.renderGradeCircle()}
                </Row>
            </div>
        )
    }
}

class TableHalf extends Component {
    renderTableRow(tweetPost) {
        return (
            <TableRow
                id = {tweetPost[0]}
                tweet = {tweetPost[1]}
                posSent = {tweetPost[2]}
                negSent = {tweetPost[3]}
            />
        )
    }

    render() {
        const mockData = [[134, "No way!", .03, .25],
                          [465, "This event was crazy.", .45, .99],
                          [786, "Pika pika!", .01, .01], 
                          [123, "Mmm... Donuts...", .99, .99],
                          [569, "I will never go to this event again!", .02, .78],
                          [145, "Smell ya later!", .56, .34],
                          [574, "Im hungry...", .45, .04], 
                          [376, "Oh no!", 0.01, 0.89],
                          [111, "I loved it!", 0.13, 0.01], 
                          [780, "It's me.", 0.56, 0.32]]

        let html = []
        for (let i = 0; i < mockData.length; i++) {
            html.push(
                <>{this.renderTableRow(mockData[i])}</>
            );
        }
        for (let i = 0; i < mockData.length; i++) {
            html.push(
                <>{this.renderTableRow(mockData[i])}</>
            );
        }

        return (
            <Col className='table-wrapper-scroll-y my-custom-scrollbar'>
                <Table striped bordered>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Tweet</th>
                        <th style={{color: "#00FF00"}}>(+) Sentiment</th>
                        <th style={{color: "#FF0000"}}>(-) Sentiment</th>
                    </tr>
                    </thead>
                    <tbody>
                    {html}
                    </tbody>
                </Table>
            </Col>
        )
    }
}

class TableRow extends Component {
    render() { 
        let id = this.props.id;
        let tweet = this.props.tweet;
        let posSent = this.props.posSent;
        let negSent = this.props.negSent;

        return (
            <tr>
                <th scope="row">{id}</th>
                <td>{tweet}</td>
                <td>{posSent}</td>
                <td>{negSent}</td>
            </tr>
        )
    }
}

class GradeCircle extends Component {
    calculateGrade(percentage) {
        let grade = ''

        if (percentage <= 100 && percentage >= 90) {
            grade = 'A'
        }

        else if (percentage < 90 && percentage >= 80) {
            grade = 'B'
        }

        else if (percentage < 80 && percentage >= 70) {
            grade = 'C'
        }

        else if (percentage < 70 && percentage >= 60) {
            grade = 'D'
        }

        else if (percentage < 60 && percentage >= 50) {
            grade = 'E'
        }

        else {
            grade = 'F'
        }

        return grade
    }

    render() {
        let percentage = 60
        let numComments = 4500000

        let grade = this.calculateGrade(percentage)

        return (
            <Col>
                <CircularProgressbar 
                    value={percentage}  
                    text={`Grade: ${grade}`}
                    styles={buildStyles({
                        strokeLinecap: 'butt',
                        pathColor: '#00FF00',
                        trailColor: '#FF0000',
                    })}
                />
                <Row>
                    <Col style={{color: "#FF0000", textAlign: 'center'}}>{100 - percentage}% Negative</Col>
                    <Col style={{color: "#00FF00", textAlign: 'center'}}>{percentage}% Positive</Col>
                </Row>
                <Row>
                    <Col style={{textAlign: 'center', fontWeight: 'bold'}}>Total Comments Gathered: {numComments}</Col>
                </Row>
            </Col>
        )
    }
}

export default App;