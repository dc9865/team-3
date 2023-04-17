import './App.css';
import {Col, Row, Table} from 'reactstrap';
import React, {Component} from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-circular-progressbar/dist/styles.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state={data: ""}
    }

    updateData = (apiResponse) => {
        this.setState({data: apiResponse})
    }

    fetchData = () => {
         fetch('https://ekqyeq1n1k.execute-api.us-east-1.amazonaws.com/test/RetrieveItems/')
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
            <TableHalf/>
        )
    }

    render () {
        let tweets = this.state.data
        
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
                posSent = {tweetPost[3]}
                negSent = {tweetPost[2]}
            />
        )
    }

    render() {
        const mockData = [[1624973346352861184, "RT @MaquinaTipster: Para festejar el #SuperBowl de los chiefs, voy a regalar un jersey de Travis Kelce.  //  // Requisitos para participar  // -Inte…", 0.001331508974544704, 0.2607319951057434],
                          [1624973346235650050, "RT @OffColourOrg: shoutout to ASL interpreter justina miles for absolutely going off for rihanna’s #SuperbOwl performance https://t.co/exVH…", 0.018793117254972458, 0.551336944103241],
                          [1624973345782476803, "RT @jasonselvig: This was hands down the best Super Bowl commercial this year. #SuperBowl https://t.co/Q1BLYyHUy3", 0.003758062608540058, 0.9471458792686462], 
                          [1624973346114007040, "RT @dearestbelcalis: LMFAO Cardi B and Offset running to make sure they don’t miss Rihanna’s halftime performance is sending meeeeee 😭😭😭😭 #…", 0.029037199914455414, 0.18745966255664825],
                          [1624973345786630147, "hEr sUrPriSe gUesT wAs heR fuggin baby broooooooo #WHAT #WOW #SuperBowl https://t.co/zwSWlYTJb3", 0.2792544364929199, 0.18727873265743256],
                          [1624973345706967048, "RT @beyoncebrasil: AQUI ELA FOI GRANDONA: Cantou “Formation” um dia depois de lançar a música, fez referência aos Panteras Negras, incomodo…", 0.010629395954310894, 0.8310677409172058],
                          [1624973346159964160, "RT @choquei: 🚨BRASIL: Remix de “Rude Boy” feito por Rihanna no #SuperBowl  foi feito por DJ Klean, de 20 anos, da Bahia. https://t.co/rBrCv…", 0.000059077076002722606, 0.00344928284175694], 
                          [1624973346281517058, "Congrats to the Chiefs #SuperBowl CHAMPS https://t.co/dU7ER9eHT8", 0.0005397088825702667, 0.9953000545501709],
                          [1624973345836961792, "If Kadarius Toney took that punt return to the house, he probably wins the #SuperBowl MVP.", 0.013535711914300919, 0.2959980368614197], 
                          [1624973346042519552, "RT @JJWatt: Script writers in their bag with that one. //  // #SuperBowl", 0.16096551716327667, 0.05783211439847946]]

        let html = []
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