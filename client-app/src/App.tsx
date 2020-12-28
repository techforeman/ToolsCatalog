import React, { Component } from 'react';
import { Header, Icon, List } from 'semantic-ui-react'
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    temps: []
  }

  componentDidMount() {
    axios.get('https://localhost:5001/api/weatherforecast')
      .then((response) => {
        console.log(response)
        this.setState({
          temps: response.data
        })
      }

      )
  }
  render() {
    return (
      <div className="App">
        <Header as='h2' icon textAlign='center'>
      <Icon name='users' circular />
      <Header.Content>Friends</Header.Content>
    </Header>
        <List>
        {this.state.temps.map((temp: any) => (
    <List.Item key={temp.id}>{temp.date}</List.Item>
    ))}
  </List>
        

      </div>
    );
  }
}



export default App;
