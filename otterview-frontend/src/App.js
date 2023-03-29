import './App.css';
import {Table} from 'reactstrap';
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
    renderTableRow(i, tweetPost) {
        return (
            <TableRow
                id = {i + 1}
                username = {tweetPost[0]}
                tweet = {tweetPost[1]}
                posSent = {tweetPost[2]}
                negSent = {tweetPost[3]}
            />
        )
    }

    render () {
        const mockData = [["Steve", "No way!", .03, .25],
                          ["Donalds", "This event was crazy.", .45, .99],
                          ["Pikachu", "Pika pika!", .01, .01], 
                          ["Homer", "Mmm... Donuts...", .99, .99],
                          ["Isaac", "I will never go to this event again!", .02, .78],
                          ["Gary", "Smell ya later!", .56, .34],
                          ["Barry", "Im hungry...", .45, .04], 
                          ["Joe", "Oh no!", 0.01, 0.89],
                          ["Clara", "I loved it!", 0.13, 0.01], 
                          ["Mario", "It's me.", 0.56, 0.32]]

        let html = []
        for (let i = 0; i < mockData.length; i++) {
            html.push(
                <>{this.renderTableRow(i, mockData[i])}</>
            );
        }

        return (
            <div>
                <h1 className='page-head'>Otterview</h1>
                <h5 className='page-head'>An event sentiment analysis system.</h5>    

                <div className='scroll-table'>
                    <Table striped bordered>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Twitter Name</th>
                            <th>Tweet</th>
                            <th style={{color: "green"}}>(+) Sentiment</th>
                            <th style={{color: "red"}}>(-) Sentiment</th>
                        </tr>
                        </thead>
                        <tbody>
                        {html}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

class TableRow extends Component {
    render() { 
        let id = this.props.id;
        let username = this.props.username;
        let tweet = this.props.tweet;
        let posSent = this.props.posSent;
        let negSent = this.props.negSent;

        return (
            <tr>
                <th scope="row">{id}</th>
                <td>{username}</td>
                <td>{tweet}</td>
                <td>{posSent}</td>
                <td>{negSent}</td>
            </tr>
        )
    }
}

export default App;
