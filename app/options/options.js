import React, { Component } from 'react';
import XLSX from 'xlsx'
import FileReaderInput from 'react-file-reader-input';
import { Button, Tabs } from 'antd'
import { getOptions, setOptions } from '../utils'

const TabPane = Tabs.TabPane;
const rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer
export default class extends Component {
  state = {}
  componentWillMount() {
    if (chrome && chrome.storage) {
      const state = getOptions().then((options) => this.setState(options))
    }
  }
  handleReadFile = (e, [result]) => {
    var data = result[0]
    var workbook = XLSX.read(data.target.result, { type: 'buffer' });
    const { SheetNames, Sheets } = workbook
    const sheets = SheetNames.map(name => {
      let sheet = Sheets[name]
      let [header, ...rows] = XLSX.utils.sheet_to_csv(sheet).split('\n').map((r) => r.split(','))
      return { name, sheet, header, rows }
    })
    this.setState({ sheets, activeSheetkey: '0', filled: {} })
  }

  handleSave = () => {
    setOptions(this.state)
  }

  renderSheets() {
    const { sheets, activeSheetkey, filled = {} } = this.state;
    if (!sheets) return null


    return (
      <Tabs activeKey={activeSheetkey} onChange={key => this.setState({ activeSheetkey: key })}>
        {sheets.map((s, i) =>
          <TabPane key={i} tab={s.name} >
            <table className="mr-table">
              <thead>
                <tr>
                  <th>序号</th>
                  {s.header.map((name, i) =>
                    <th key={i}>{name}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {s.rows.map((row, rIndex) =>
                  <tr key={rIndex} onClick={() => this.setState({ filled: { ...filled, [rIndex]: !filled[rIndex] } })}
                    className={filled[rIndex] ? 'filled-row' : ''}
                  >
                    <td>{rIndex+1}</td>
                    {row.map((value, cIndex) =>
                      <td key={cIndex}>{value}</td>
                    )}
                  </tr>
                )}
              </tbody>
            </table>
          </TabPane>
        )}
      </Tabs>

    );
  }
  render() {
    const { sheets } = this.state
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Mr Cai is at your service~</h1>
        </header>
        <FileReaderInput as="buffer" id="my-file-input" onChange={this.handleReadFile}>
          <Button type={sheets ? 'default' : 'primary'}>打开 .xlsx 文件</Button>
        </FileReaderInput>
        {sheets && <Button type="primary" onClick={this.handleSave}> 保存设置 </Button>}
        {this.renderSheets()}
      </div>
    );
  }
}
