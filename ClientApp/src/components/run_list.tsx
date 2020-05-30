import React from "react";
import { RouteComponentProps } from "react-router-dom";

import { Table } from "reactstrap";
import { useGet } from "restful-react";
import { compareDesc } from "date-fns";

import { RunTableRow } from "./fields";
import { Run } from "../types";

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
              <RunTableRow
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

export default RunList;
