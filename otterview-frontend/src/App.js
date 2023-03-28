import './App.css';
import {Table} from 'reactstrap';
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render () {
        return (
            <div className='scroll-table'>
                <Table striped bordered>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Twitter Name</th>
                        <th>Tweet</th>
                        <th>+ Sentiment</th>
                        <th>- Sentiment</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>100</td>
                        <td>-100</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default App;
