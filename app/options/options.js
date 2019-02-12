import React, { Component } from 'react';
import { Button } from 'antd'

export default class extends Component {
  state = {}
  componentWillMount() {
    if (chrome && chrome.storage) {
      const state = getOptions().then((options) => this.setState(options))
    }
  }

  handleOk = () => {
    console.log("hello, world", this.state)
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Just try it ~</h1>
        </header>
        <Button type="primary" onClick={this.handleOk}> Try it ~ </Button>
      </div>
    );
  }
}
