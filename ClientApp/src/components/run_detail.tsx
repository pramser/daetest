import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  Row,
  Col,
  Table,
  Collapse,
  Input,
  ButtonGroup,
  Button,
  Badge,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Textarea from "react-textarea-autosize";
import { useGet, useMutate } from "restful-react";

import Prism from "prismjs";
import "../prism.css";

import { Run, Test, RunType, Result } from "../types";
import { MetaIcon, RunIcon } from "./fields";

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

  const { id, file_name, product, meta, type } = data as Run;

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
          <RunIcon type={type} size="lg" />
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
            <Badge className="meta-pill" color="secondary">
              {meta}
            </Badge>
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
          {data.map((testcase: any) => (
            <TestCaseRow
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

interface TestCaseRowProps {
  testcase: Test;
  onDelete: any;
}

const TestCaseRow = ({ testcase, onDelete }: TestCaseRowProps) => {
  Prism.highlightAll();

  const [collapse, setCollapse] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [info, setInfo] = useState(testcase.info);
  const [result, setResult] = useState(testcase.result);

  const toggleEdit = () => {
    if (isEditing) {
      putTest({ info });
    }
    setIsEditing(!isEditing);
  };

  const onChange = (e: any) => {
    setInfo(e.target.value);
  };

  const { id, name } = testcase;
  const { mutate: putTest } = useMutate({
    verb: "PUT",
    path: `tests/${id}`,
  });

  return (
    <tr key={id}>
      <TestResult
        id={id}
        result={result}
        onUpdate={(r: Result) => setResult(r)}
      />
      <td style={{ width: "90%", flexDirection: "column" }}>
        <div>
          <span>{name}</span>
          <span
            style={{ float: "right", marginRight: "0.5em" }}
            onClick={() => setCollapse(!collapse)}
          >
            <FontAwesomeIcon icon="chevron-down" color="grey" />
          </span>
        </div>
        <Collapse isOpen={collapse}>
          <div className="test-info">
            <div className="edit-info">
              <span
                style={{ float: "right", cursor: "pointer" }}
                onClick={toggleEdit}
              >
                <FontAwesomeIcon
                  icon="edit"
                  color="white"
                  style={{ marginRight: "0.2em" }}
                />
                Edit
              </span>
            </div>
            {isEditing === true ? (
              <Textarea className="edit-box" onChange={onChange} value={info} />
            ) : (
              <pre className="language-javascript">
                {info ? info : "Click edit to add test data..."}
              </pre>
            )}
          </div>
        </Collapse>
      </td>
      <td>
        <RemoveButton id={testcase.id} onDelete={onDelete} />
      </td>
    </tr>
  );
};

interface TestResultProps {
  id: string;
  result: Result;
  onUpdate: any;
}

const TestResult = ({ id, result, onUpdate }: TestResultProps) => {
  const isPass = result === Result.Pass;

  const { mutate: putTest } = useMutate({
    verb: "PUT",
    path: `tests/${id}`,
  });

  return (
    <td style={{ width: "10%" }}>
      <ButtonGroup>
        <Button
          outline
          color={isPass ? "success" : "secondary"}
          disabled={isPass}
          onClick={() => putTest({ result: "PASS" }).then(onUpdate("PASS"))}
        >
          <FontAwesomeIcon icon="check" color={isPass ? "green" : "grey"} />
        </Button>
        <Button
          outline
          color={!isPass ? "danger" : "secondary"}
          disabled={!isPass}
          onClick={() => putTest({ result: "FAIL" }).then(onUpdate("FAIL"))}
        >
          <FontAwesomeIcon icon="times" color={!isPass ? "red" : "grey"} />
        </Button>
      </ButtonGroup>
    </td>
  );
};

interface RemoveButtonProps {
  id: string;
  onDelete: any;
}

const RemoveButton = ({ id, onDelete }: RemoveButtonProps) => {
  const { mutate: deleteTest } = useMutate({
    verb: "DELETE",
    path: `tests`,
  });

  return (
    <span
      style={{ marginRight: "0.5em" }}
      onClick={() => deleteTest(id).then(onDelete)}
    >
      <FontAwesomeIcon icon="times" color="grey" />
    </span>
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
