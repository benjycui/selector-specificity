import React from 'react';
import { Row, Col, Input, Table } from 'antd';
import { calculate } from 'specificity';
import './app.less';

const columns = [{
  title: 'Selector',
  dataIndex: 'selector',
}, {
  title: 'Specificity',
  dataIndex: 'specificity',
}];

const isEmptyStr = RegExp.prototype.test.bind(/^\s+$/);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  handleChange(event) {
    const selectors = event.target.value || '';
    const data = calculate(selectors).filter(({ selector }) => !isEmptyStr(selector));

    this.setState({ data });
  }

  render() {
    const data = this.state.data;
    const results = data.length === 0 ? null : (
      <Table columns={columns} size="small" pagination={false}
        dataSource={this.state.data}
      />
    );
    return (
      <Row>
        <Col span="10" offset="7">
          <h1><strong>CSS</strong> selector's specificity</h1>
          <Input id="selector" type="text" size="large"
            onChange={this.handleChange.bind(this)}
          />

          { results }
        </Col>
      </Row>
    );
  }
}
