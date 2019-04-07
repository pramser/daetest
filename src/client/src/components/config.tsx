// Dependencies
import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Col, Row, Input, Table } from 'reactstrap';

class Config extends Component<
  any,
  { alm: { name: string; url: string }; users: Array<any> }
> {
  state = {
    alm: { name: '', url: '' },
    users: []
  };

  componentDidMount() {
    const alm = {
      name: 'Jira',
      url: 'https://company.atlassian.com/'
    };

    const users = [{ name: 'Patrick', email: 'pramser@gmail.com' }];
    this.setState({ alm, users });
  }

  render() {
    return (
      <div className="Config">
        <Card>
          <CardHeader>ALM Integration</CardHeader>
          <CardBody>
            <Row>
              <Col size={4}>{this.state.alm.name}</Col>
              <Col size={8}>
                <Input type="text" value={this.state.alm.url} />
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user: any) => (
              <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Config;
