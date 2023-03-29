import './App.css';
import {Table} from 'reactstrap';
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

    renderTableRow(i) {
        return (
            <TableRow
                id = {i}
            />
        )
    }

    render () {
        let html = []
        for (let i = 1; i <= 100; i++) {
            html.push(
                <>{this.renderTableRow(i)}</>
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
        /*
        let username = this.props.username;
        let tweet = this.props.tweet;
        let posSent = this.props.posSent;
        let negSent = this.props.negSent;
        */

        return (
            <tr>
                <th scope="row">{id}</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>100</td>
                <td>-100</td>
            </tr>
        )
    }
}

export default App;
