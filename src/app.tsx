import axios from 'axios';
import React from 'react';
import { Col, Row, Container, Dropdown } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './app.css';

type TimeFrame = 'Day' | 'Week' | 'Month';

interface IAppState {
  timeFrame: TimeFrame;
}

export class App extends React.Component {
  state: IAppState = {
    timeFrame: 'Day'
  };

  api = axios.create({
    baseURL: 'https://api.nytimes.com/svc/mostpopular/v2'
  });

  setTimeFrame(arg: TimeFrame) {
    this.setState({ ...this.state, timeFrame: arg })
  }

  async fetchArticles(timeFrame: TimeFrame) {
    const timeNumber = timeFrame === 'Day' ? 1 : timeFrame === 'Week' ? 7 : 30;
    const fetchResult = await this.api.post(`/viewed/${timeNumber}.json?api-key=${process.env.NYT_API_KEY}`);
    console.log(fetchResult);
  }

  componentDidMount(): void {
    console.log('Fetching articles with time frame: ' + this.state.timeFrame);
    this.fetchArticles(this.state.timeFrame);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1 className="display-1 text-center">Acta Diurna</h1>
            <h4 className="text-center"><em>Today's trending news.</em></h4>
            <br />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <div className="form-group form-inline">
              <span>Showing top stories from the past </span>
              <select name="time-select" id="time-select" className="custom-select">
                <option value="Day" onClick={() => this.setTimeFrame('Day')}>Day</option>
                <option value="Week" onClick={() => this.setTimeFrame('Week')}>Week</option>
                <option value="Month" onClick={() => this.setTimeFrame('Month')}>Month</option>
              </select>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}