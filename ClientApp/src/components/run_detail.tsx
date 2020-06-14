import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Row, Col, Table, Input, Button, Badge } from "reactstrap";
import { useGet, useMutate } from "restful-react";

import { Run, Test, RunType } from "../types";
import { MetaIcon, RunTypeIcon, TestTableRow } from "./controls";

const RunDetail: any = (props: RouteComponentProps) => {
  const paths = props.location.pathname.split("/");
  const runId = paths[paths.length - 1];
  const { data, loading, error } = useGet(`runs/${runId}`);

  if (loading) {
    return "Is loading...";
  }

  if (error) {
    return "Error occurred!";
  }

  const { id, file_name, product, type } = data as Run;

  return (
    <div>
      <Row>
        <Col>
          <h3>{file_name}</h3>
        </Col>
        <Col style={{ textAlign: "right" }}>
          <Button outline size="sm">
            Edit
          </Button>
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
          <RunTypeIcon type={type} size="lg" />
          <div className="meta-info">
            <Badge className="meta-pill" color="info">
              {RunType[type]}
            </Badge>
            <span>Version 0.0.0</span>
          </div>
        </Col>
        <Col className="meta-col">
          <MetaIcon text="U" size="lg" color="secondary" />
          <div className="meta-info">
            <span>Test-Meta</span>
          </div>
        </Col>
      </Row>
      <hr />
      <TestCases runId={id} />
    </div>
  );
};

const TestCases: any = ({ runId }: any) => {
  const { loading, error, data, refetch } = useGet(`runs/${runId}/tests`);

  if (loading) {
    return "Is loading...";
  }

  if (error) {
    return "Error occurred!";
  }

  return (
    <div>
      <h4>Test Cases</h4>
      <Table style={{ border: "2px solid #ddd" }}>
        <thead>
          <tr>
            <th>Result</th>
            <th>Test Name</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data.map((testcase: Test) => (
            <TestTableRow
              key={testcase.id}
              testcase={testcase}
              onDelete={() => refetch()}
            />
          ))}
          <NewTestCaseRow runId={runId} onCreate={() => refetch()} />
        </tbody>
      </Table>
    </div>
  );
};

interface NewTestCaseRowProps {
  runId: string;
  onCreate: any;
}

const NewTestCaseRow = ({ runId, onCreate }: NewTestCaseRowProps) => {
  const { mutate: postTest } = useMutate({
    verb: "POST",
    path: `tests`,
  });

  return (
    <tr>
      <td colSpan={3}>
        <Input
          placeholder="New Test Name..."
          onKeyDown={(e: any) => {
            if (e.keyCode !== 13) {
              return;
            }

            const body = {
              run_id: runId,
              name: e.target.value,
              description: "",
              info: "",
              result: "PASS",
            };
            postTest(body)
              .then(onCreate)
              .then((e.target.value = null));
          }}
        />
      </td>
    </tr>
  );
};

export default RunDetail;
