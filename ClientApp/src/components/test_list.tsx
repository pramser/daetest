import React, { MouseEventHandler } from "react";
import { Table, Badge } from "reactstrap";
import { useGet } from "restful-react";
import compareDesc from "date-fns/compare_desc";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";

import { TestRun } from "../types/Types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TestIcon from "./test_icon";

const TestList: any = (props: any) => {
  const handleRowClick = (id: string) => {
    props.history.push(`/tests/${id}`);
  };

  const { data, loading, error, refetch } = useGet("tests");

  if (loading) {
    return "Is loading...";
  }

  if (error) {
    return "Error occurred!";
  }

  var testruns = data.allTestRuns as [TestRun];

  return (
    <div className="TestList">
      <div className="sub-menu">
        {/* <CreateTestRun onCreate={() => refetch()} />
        <FileUpload onUpload={() => refetch()} /> */}
      </div>
      <Table style={{ border: "2px solid #ddd" }}>
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
                onClick={() => handleRowClick(testrun.id)}
              />
            ))}
        </tbody>
      </Table>
    </div>
  );
};

const ResultRow = (props: {
  testrun: TestRun;
  onClick?: MouseEventHandler<any>;
}) => {
  const { filename, product, meta, type, createdat } = props.testrun;

  return (
    <tr className="result" onClick={props.onClick}>
      <ResultStatus />
      <td style={{ flexDirection: "column" }}>
        <div className="file-name">{filename}</div>
        <div style={{ flexDirection: "row" }}>
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
      <td>
        <TestIcon type={type} size="sm" />
      </td>
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

const Assignee = () => <td>{"n/a"}</td>;

const Issue = () => <td>{"n/a"}</td>;

const Chevron = () => (
  <td>
    <FontAwesomeIcon icon="chevron-right" color="grey" />
  </td>
);

export default TestList;
