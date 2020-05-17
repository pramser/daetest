// Dependencies
import React, { Component } from 'react';
import {
  Row,
  Col,
  Table,
  Collapse,
  Input,
  ButtonGroup,
  Button,
  Badge,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Textarea from 'react-textarea-autosize';

import Prism from 'prismjs';
import '../prism.css';

import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

import { TestRun, TestCase } from '../types/Types';
import TestIcon from './test_icon';
import MetaIcon from './meta_icon';

const TEST_RUN_BY_ID = gql`
  query testRunById($id: String!) {
    testRunById(id: $id) {
      id
      filename
      product
      meta
      type
      createdat
    }
  }
`;

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

class TestDetail extends Component<{ location: { pathname: string } }, any> {
  render() {
    const paths = this.props.location.pathname.split('/');
    const runid = paths[paths.length - 1];

    return (
      <Query query={TESTCASES_BY_RUN_ID} variables={{ runid }}>
        {({ loading, error, data, refetch }: any) => {
          if (loading) {
            return 'Is loading...';
          }

          if (error) {
            return 'Error occurred!';
          }

          const testcases = data.testCasesByRunId;

          return (
            <div className="TestDetail">
              <Query query={TEST_RUN_BY_ID} variables={{ id: runid }}>
                {({ loading, error, data }: any) => {
                  if (loading) {
                    return 'Is loading...';
                  }

                  if (error) {
                    return 'Error occurred!';
                  }

                  const {
                    id,
                    filename,
                    product,
                    meta,
                    type,
                  } = data.testRunById as TestRun;

                  return (
                    <div>
                      <Row>
                        <Col>
                          <h3>{filename}</h3>
                        </Col>
                        <Col style={{ textAlign: 'right' }}>
                          <Button outline size="sm">
                            Edit
                          </Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <span className="test-guid">
                            <b>GUID:</b> {id}
                          </span>
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col className="meta-col">
                          <MetaIcon text="P" size="lg" color="primary" />
                          <div className="meta-info">
                            <Badge className="meta-pill" color="primary">
                              {product}
                            </Badge>
                            <span>Test-Product</span>
                          </div>
                        </Col>
                        <Col className="meta-col">
                          <TestIcon type={type} size="lg" />
                          <div className="meta-info">
                            <span>{type}</span>
                            <span>Version 0.0.0</span>
                          </div>
                        </Col>
                        <Col className="meta-col">
                          <MetaIcon text="U" size="lg" color="secondary" />
                          <div className="meta-info">
                            <Badge className="meta-pill" color="secondary">
                              {meta}
                            </Badge>
                            <span>Test-Meta</span>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  );
                }}
              </Query>
              <hr />
              <h4>Test Cases</h4>
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
                  <NewTestCaseRow runid={runid} onCreate={() => refetch()} />
                </tbody>
              </Table>
            </div>
          );
        }}
      </Query>
    );
  }
}

const REMOVE_TEST_CASE = gql`
  mutation removeTestCase($id: String!) {
    removeTestCase(id: $id)
  }
`;

const MODIFY_TEST_CASE = gql`
  mutation modifyTestCase($id: String!, $testCase: TestCaseInput!) {
    modifyTestCase(id: $id, testCase: $testCase) {
      id
    }
  }
`;

class TestCaseRow extends Component<
  { testcase: TestCase; onDelete: any },
  { collapse: boolean; isEditing: boolean; info: string; result: string }
> {
  state = { collapse: false, isEditing: false, info: '', result: 'PASS' };

  constructor(props: any) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      info: this.props.testcase.info,
      result: this.props.testcase.result,
    });

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
    const { id, name } = this.props.testcase;

    return (
      <tr key={id}>
        <TestResult
          id={id}
          result={this.state.result}
          onUpdate={(result: string) => this.setState({ result })}
        />
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
                <Mutation mutation={MODIFY_TEST_CASE}>
                  {(modifyTestCase: any) => (
                    <span
                      style={{ float: 'right', cursor: 'pointer' }}
                      onClick={() => {
                        if (this.state.isEditing) {
                          modifyTestCase({
                            variables: {
                              id: this.props.testcase.id,
                              testCase: { info: this.state.info },
                            },
                          });
                        }
                        this.toggleEdit();
                      }}
                    >
                      <FontAwesomeIcon
                        icon="edit"
                        color="white"
                        style={{ marginRight: '0.2em' }}
                      />
                      Edit
                    </span>
                  )}
                </Mutation>
              </div>
              {this.state.isEditing === true ? (
                <Textarea
                  className="edit-box"
                  onChange={this.onChange}
                  value={this.state.info}
                />
              ) : (
                <pre className="language-javascript">
                  {this.state.info
                    ? this.state.info
                    : 'Click edit to add test data...'}
                </pre>
              )}
            </div>
          </Collapse>
        </td>
        <td>
          <RemoveButton
            id={this.props.testcase.id}
            onDelete={this.props.onDelete}
          />
        </td>
      </tr>
    );
  }
}

const TestResult = (props: { id: string; result: string; onUpdate: any }) => {
  const isPass = props.result === 'PASS';

  return (
    <Mutation mutation={MODIFY_TEST_CASE}>
      {(modifyTestCase: any) => (
        <td style={{ width: '10%' }}>
          <ButtonGroup>
            <Button
              outline
              color={isPass ? 'success' : 'secondary'}
              disabled={isPass}
              onClick={() =>
                modifyTestCase({
                  variables: {
                    id: props.id,
                    testCase: { result: 'PASS' },
                  },
                }).then(props.onUpdate('PASS'))
              }
            >
              <FontAwesomeIcon icon="check" color={isPass ? 'green' : 'grey'} />
            </Button>
            <Button
              outline
              color={!isPass ? 'danger' : 'secondary'}
              disabled={!isPass}
              onClick={() =>
                modifyTestCase({
                  variables: {
                    id: props.id,
                    testCase: { result: 'FAIL' },
                  },
                }).then(props.onUpdate('FAIL'))
              }
            >
              <FontAwesomeIcon icon="times" color={!isPass ? 'red' : 'grey'} />
            </Button>
          </ButtonGroup>
        </td>
      )}
    </Mutation>
  );
};

const RemoveButton = (props: { id: string; onDelete: any }) => (
  <Mutation mutation={REMOVE_TEST_CASE}>
    {(removeTestCase: any) => (
      <span
        style={{ marginRight: '0.5em' }}
        onClick={() =>
          removeTestCase({
            variables: { id: props.id },
          }).then(props.onDelete)
        }
      >
        <FontAwesomeIcon icon="times" color="grey" />
      </span>
    )}
  </Mutation>
);

const CREATE_TEST_CASE = gql`
  mutation createTestCase($runid: String!, $testCase: TestCaseInput!) {
    createTestCase(runid: $runid, testCase: $testCase) {
      id
    }
  }
`;

const NewTestCaseRow = (props: { runid: string; onCreate: any }) => (
  <tr>
    <td colSpan={3}>
      <Mutation mutation={CREATE_TEST_CASE}>
        {(createTestCase: any) => (
          <Input
            placeholder="New Test Name..."
            onKeyDown={(e: any) => {
              if (e.keyCode !== 13) {
                return;
              }
              createTestCase({
                variables: {
                  runid: props.runid,
                  testCase: {
                    name: e.target.value,
                    info: '',
                    description: '',
                    result: 'PASS',
                  },
                },
              }) // Callback, then reset my test box for new tests.
                .then(props.onCreate)
                .then((e.target.value = null));
            }}
          />
        )}
      </Mutation>
    </td>
  </tr>
);

export default TestDetail;