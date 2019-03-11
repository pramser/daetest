// Dependencies
import React, { Component, MouseEventHandler } from 'react';
import { Table, Badge } from 'reactstrap';
import compareDesc from 'date-fns/compare_desc';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

// Types
import { TestRun, TestRunType } from '../../types/Types';

// Data
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import CreateTestRun from '../create_test_run';
import FileUpload from '../file_upload';

const GET_TEST_RUNS = gql`
  {
    allTestRuns {
      id
      filename
      product
      meta
      type
      createdat
    }
  }
`;

class TestList extends Component<{ history: any }, any> {
  handleRowClick = (id: string) => {
    this.props.history.push(`/tests/${id}`);
  };

  render() {
    return (
      <Query query={GET_TEST_RUNS}>
        {({ loading, error, data, refetch }) => {
          if (loading) {
            return 'Is loading...';
          }

          if (error) {
            return 'Error occurred!';
          }

          var testruns = data.allTestRuns as [TestRun];

          return (
            <div className="TestList">
              <div className="sub-menu">
                <CreateTestRun onCreate={() => refetch()} />
                <FileUpload onUpload={() => refetch()} />
              </div>
              <Table style={{ border: '2px solid #ddd' }}>
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>File</th>
                    <th>Type</th>
                    <th>Assignee</th>
                    <th>Issue</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {testruns
                    .sort((a, b) => compareDesc(a.createdat, b.createdat))
                    .map((testrun: TestRun) => (
                      <ResultRow
                        key={testrun.id}
                        testrun={testrun}
                        onClick={() => this.handleRowClick(testrun.id)}
                      />
                    ))}
                </tbody>
              </Table>
            </div>
          );
        }}
      </Query>
    );
  }
}

const ResultRow = (props: {
  testrun: TestRun;
  onClick?: MouseEventHandler<any>;
}) => {
  const { filename, product, meta, type, createdat } = props.testrun;

  return (
    <tr className="result" onClick={props.onClick}>
      <ResultStatus />
      <td style={{ flexDirection: 'column' }}>
        <div className="file-name">{filename}</div>
        <div style={{ flexDirection: 'row' }}>
          <span className="result-date meta-pill">
            <FontAwesomeIcon icon="clock" className="right-pad" />
            {distanceInWordsToNow(createdat)}
          </span>
          <Badge className="meta-pill" color="primary">
            {product}
          </Badge>
          <Badge className="meta-pill" color="secondary">
            {meta}
          </Badge>
        </div>
      </td>
      <TestIcon type={type} />
      <Assignee />
      <Issue />
      <Chevron />
    </tr>
  );
};

const ResultStatus = () => (
  <td>
    <FontAwesomeIcon icon="times" color="red" />
  </td>
);

const TestIcon = (props: { type: TestRunType }) => (
  <td>
    {props.type !== TestRunType.None ? (
      <img
        src={`${process.env.PUBLIC_URL}/images/${props.type}.png`}
        height="50"
        alt="None"
      />
    ) : (
      'None'
    )}
  </td>
);

const Assignee = () => <td>{'n/a'}</td>;

const Issue = () => <td>{'n/a'}</td>;

const Chevron = () => (
  <td>
    <FontAwesomeIcon icon="chevron-right" color="grey" />
  </td>
);

export default TestList;
