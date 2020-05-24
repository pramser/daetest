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

  const { data, loading, error, refetch } = useGet("runs");

  if (loading) {
    return "Is loading...";
  }

  if (error) {
    return "Error occurred!";
  }

  var testruns = data as [TestRun];

  return (
    <div className="TestList">
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
            .sort((a, b) => compareDesc(a.created_at, b.created_at))
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
  const { file_name, product, meta, type, created_at } = props.testrun;

  return (
    <tr className="result" onClick={props.onClick}>
      <ResultStatus />
      <td style={{ flexDirection: "column" }}>
        <div className="file-name">{file_name}</div>
        <div style={{ flexDirection: "row" }}>
          <span className="result-date meta-pill">
            <FontAwesomeIcon icon="clock" className="right-pad" />
            {distanceInWordsToNow(created_at)}
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
