import React, { MouseEventHandler } from "react";
import { RouteComponentProps } from "react-router-dom";

import { Table, Badge } from "reactstrap";
import { useGet } from "restful-react";
import { compareDesc, formatDistanceToNow } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Run, Result } from "../types";
import TestIcon from "./test_icon";

const RunList: any = (props: RouteComponentProps) => {
  const handleRowClick = (id: string) => {
    props.history.push(`/tests/${id}`);
  };

  const { data, loading, error } = useGet("runs");

  if (loading) {
    return "Is loading...";
  }

  if (error) {
    return "Error occurred!";
  }

  var runs = data as [Run];

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
          {runs
            .sort((a, b) =>
              compareDesc(new Date(a.created_at), new Date(b.created_at))
            )
            .map((run: Run) => (
              <ResultRow
                key={run.id}
                run={run}
                onClick={() => handleRowClick(run.id)}
              />
            ))}
        </tbody>
      </Table>
    </div>
  );
};

interface ResultRowProps {
  run: Run;
  onClick?: MouseEventHandler<any>;
}

const ResultRow = ({ run, onClick }: ResultRowProps) => {
  const { file_name, product, meta, type, status, created_at } = run;

  return (
    <tr className="result" onClick={onClick}>
      <td>
        <ResultStatus status={status} />
      </td>
      <td style={{ flexDirection: "column" }}>
        <div className="file-name">{file_name}</div>
        <div style={{ flexDirection: "row" }}>
          <span className="result-date meta-pill">
            <FontAwesomeIcon icon="clock" className="right-pad" />
            {formatDistanceToNow(new Date(created_at))}
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

const ResultStatus = (props: any) => {
  if (props.status === Result.Pass)
    return <FontAwesomeIcon icon="check" color="green" />;

  if (props.status === Result.Fail)
    return <FontAwesomeIcon icon="times" color="red" />;

  return <FontAwesomeIcon icon="dot-circle" color="grey" />;
};

const Assignee = () => <td>n/a</td>;

const Issue = () => <td>n/a</td>;

const Chevron = () => (
  <td>
    <FontAwesomeIcon icon="chevron-right" color="grey" />
  </td>
);

export default RunList;
