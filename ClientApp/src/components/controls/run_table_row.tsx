import React, { MouseEventHandler } from "react";

import { formatDistanceToNow } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge } from "reactstrap";

import { Assignee, Chevron, Issue, RunResultIcon, RunTypeIcon } from ".";
import { Run } from "../../types";

interface RunTableRowProps {
  run: Run;
  onClick?: MouseEventHandler<any>;
}

const RunTableRow = ({ run, onClick }: RunTableRowProps) => {
  const { file_name, product, meta, type, status, created_at } = run;

  return (
    <tr className="result" onClick={onClick}>
      <td>
        <RunResultIcon status={status} />
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
        <RunTypeIcon type={type} size="sm" />
      </td>
      <Assignee />
      <Issue />
      <Chevron />
    </tr>
  );
};

export default RunTableRow;
