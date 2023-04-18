import './App.css';
import {Col, Row, Table} from 'reactstrap';
import React, {Component} from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-circular-progressbar/dist/styles.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {data: []}
    }

    updateData = (apiResponse) => {
        this.setState({data: apiResponse})
    }

    fetchData = () => {
         fetch('https://aphcuaqzyk.execute-api.us-east-1.amazonaws.com/prod')
         .then(
             response => response.json() 
             )
         .then (jsonOutput =>
                {
                    this.updateData(jsonOutput)
                }
              )
    }

    componentDidMount(){
        this.fetchData();
    }

    renderGradeCircle() {
        return (
            <GradeCircle/>
        )
    }

    renderTableHalf() {
        return (
            <TableHalf data={this.state.data} />
        )
    }

    render () {
        let tweets = this.state.data.body
        
        return (
            <div className='height-setter'>
                <h1 className='page-head'>OtterView {tweets}</h1>
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
                id = {tweetPost.id}
                tweet = {tweetPost.Comment}
                posSent = {tweetPost.PositiveSentiment}
                negSent = {tweetPost.NegativeSentiment}
            />
        )
    }

    render() {
        let html = []
        for (let i = 0; i < this.props.data.length; i++) {
            html.push(
                <>{this.renderTableRow(this.props.data[i])}</>
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
        let posSent = (this.props.posSent).toFixed(3);
        let negSent = (this.props.negSent).toFixed(3);

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
        let percentage = 80
        let numComments = 10

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