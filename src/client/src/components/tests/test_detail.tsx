// Dependencies
import React, { Component } from 'react';
import { Table, Collapse, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Prism from 'prismjs';
import Textarea from 'react-textarea-autosize';

import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

import '../../prism.css';

const TESTCASES_BY_RUN_ID = gql`
  query testCasesByRunId($runid: String!) {
    testCasesByRunId(runid: $runid) {
      id
      name
      info
      description
      result
    }
  }
`;

const CREATE_TEST_CASE = gql`
  mutation createTestCase($runid: String!, $testCase: TestCaseInput!) {
    createTestCase(runid: $runid, testCase: $testCase) {
      id
    }
  }
`;

const REMOVE_TEST_CASE = gql`
  mutation removeTestCase($id: String!) {
    removeTestCase(id: $id)
  }
`;

class TestDetail extends Component<any, any> {
  render() {
    const paths = this.props.location.pathname.split('/');
    const runid = paths[paths.length - 1];

    return (
      <Query query={TESTCASES_BY_RUN_ID} variables={{ runid }}>
        {({ loading, error, data, refetch }) => {
          if (loading) {
            return 'Is loading...';
          }

          if (error) {
            return 'Error occurred!';
          }

          const testcases = data.testCasesByRunId;

          return (
            <div className="TestDetail">
              <div>
                <h2>{runid}</h2>
              </div>
              <Table style={{ border: '2px solid #ddd' }}>
                <thead>
                  <tr>
                    <th>Result</th>
                    <th>Test Name</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {testcases.map((testcase: any) => (
                    <TestCaseRow
                      key={testcase.id}
                      testcase={testcase}
                      onDelete={() => refetch()}
                    />
                  ))}
                  <tr>
                    <td colSpan={3}>
                      <Mutation mutation={CREATE_TEST_CASE}>
                        {createTestCase => (
                          <Input
                            placeholder="New Test Name..."
                            onKeyDown={(e: any) => {
                              if (e.keyCode !== 13) {
                                return;
                              }
                              createTestCase({
                                variables: {
                                  runid,
                                  testCase: {
                                    name: e.target.value,
                                    info: '',
                                    description: '',
                                    result: 'PASS'
                                  }
                                }
                              }).then(() => refetch());
                            }}
                          />
                        )}
                      </Mutation>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          );
        }}
      </Query>
    );
  }
}

class TestCaseRow extends Component<
  { testcase: any; onDelete: any },
  { collapse: boolean; isEditing: boolean; info: string }
> {
  state = { collapse: false, isEditing: false, info: '' };

  constructor(props: any) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.setState({ info: this.props.testcase.info });

    Prism.highlightAll();
  }

  toggleInfo() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleEdit() {
    this.setState({ isEditing: !this.state.isEditing });
  }

  onChange(e: any) {
    this.setState({ info: e.target.value });
  }

  render() {
    const { id, name, result } = this.props.testcase;

    return (
      <tr key={id}>
        <td style={{ width: '10%' }}>
          <FontAwesomeIcon
            icon={result === 'PASS' ? 'check' : 'times'}
            color={result === 'PASS' ? 'green' : 'red'}
          />
        </td>
        <td style={{ width: '90%', flexDirection: 'column' }}>
          <div>
            <span>{name}</span>
            <span
              style={{ float: 'right', marginRight: '0.5em' }}
              onClick={() => this.toggleInfo()}
            >
              <FontAwesomeIcon icon="chevron-down" color="grey" />
            </span>
          </div>
          <Collapse isOpen={this.state.collapse}>
            <div className="test-info">
              <div className="edit-info">
                <span
                  style={{ float: 'right', cursor: 'pointer' }}
                  onClick={() => this.toggleEdit()}
                >
                  <FontAwesomeIcon
                    icon="edit"
                    color="white"
                    style={{ marginRight: '0.2em' }}
                  />
                  Edit
                </span>
              </div>
              {this.state.isEditing === true ? (
                <Textarea
                  className="edit-box"
                  onChange={this.onChange}
                  value={this.state.info}
                />
              ) : (
                <pre className="language-javascript">{this.state.info}</pre>
              )}
            </div>
          </Collapse>
        </td>
        <td>
          <Mutation mutation={REMOVE_TEST_CASE}>
            {removeTestCase => (
              <span
                style={{ marginRight: '0.5em' }}
                onClick={() =>
                  removeTestCase({
                    variables: { id: this.props.testcase.id }
                  })
                    .then(data => console.log(data))
                    .then(this.props.onDelete)
                }
              >
                <FontAwesomeIcon icon="times" color="grey" />
              </span>
            )}
          </Mutation>
        </td>
      </tr>
    );
  }
}

export default TestDetail;
