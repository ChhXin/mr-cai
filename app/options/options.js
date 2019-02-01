import React, { Component } from 'react';
import { Button, Tabs } from 'antd'
import { getOptions, setOptions } from '../utils'

export default class extends Component {
  state = {}
  componentWillMount() {
    if (chrome && chrome.storage) {
      const state = getOptions().then((options) => this.setState(options))
    }
  }

  handleSave = () => {
    setOptions(this.state)
  }

  render() {
    const { sheets } = this.state
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Mr Cai is at your service~</h1>
        </header>

        {<Button type="primary" onClick={this.handleSave}> 保存设置 </Button>}
      </div>
    );
  }
}
