// Dependencies
import React, { Component } from 'react';

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
        <div className="alm">
          <span>{this.state.alm.name}</span>
        </div>
        <div className="users">
          {this.state.users.map((user: any) => (
            <span>{user.name}</span>
          ))}
        </div>
      </div>
    );
  }
}

export default Config;
