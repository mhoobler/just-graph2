import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ChartComp from './ChartComp';

import axios from 'axios';

class App extends Component{
  constructor(props)
  {
    super(props)

    this.state = {
      graphInfo: null,
      setting: "high"
    }

    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount()
  {
    let x = axios.get('/_api-test');
    console.log(x);

    return x;
  }

  handleInput(e)
  {
    e.preventDefault();
    let input = document.getElementById('input').value;
    console.log(input);

    axios.get('/_api/alpha/' + input)
    .then(alpha => {
      console.log(alpha)
      this.setState({
        graphInfo: {
            symbol: alpha.data["Meta Data"]["2. Symbol"],
            keys: Object.keys(alpha.data["Time Series (Daily)"]).reverse(),
            data: alpha.data["Time Series (Daily)"]
        }
    })
    });

  }

  render()
  {
    return (
        <body>
          <div id="content">
            {this.state.graphInfo ? <ChartComp graphInfo={this.state.graphInfo} setting={this.state.setting} /> : null}
            <form>
              <input id='input' type='text'/>
              <button onClick={this.handleInput}>Test</button>
            </form>
          </div>
        </body>
    );
  }
}

export default App;
