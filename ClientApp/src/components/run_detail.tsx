import React, { Component } from "react";
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
import { useGet } from "restful-react";

import Prism from "prismjs";
import "../prism.css";

import { TestRun, TestCase, TestRunType } from "../types";
import TestIcon from "./test_icon";
import MetaIcon from "./meta_icon";

const RunDetail: any = (props: any) => {
  const { data, loading, error, refetch } = useGet("runs/1");

  if (loading) {
    return "Is loading...";
  }

  if (error) {
    return "Error occurred!";
  }

  const { id, file_name, product, meta, type } = data as TestRun;

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
            <Badge className="meta-pill" color="info">
              {TestRunType[type]}
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
      <TestCases runId={1} />
    </div>
  );
};

const TestCases: any = ({ runId }: any) => {
  const { loading, error, data, refetch } = useGet(`tests?runId=1`);

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
          <NewTestCaseRow runid={runId} onCreate={() => refetch()} />
        </tbody>
      </Table>
    </div>
  );
};

class TestCaseRow extends Component<
  { testcase: TestCase; onDelete: any },
  { collapse: boolean; isEditing: boolean; info: string; result: string }
> {
  state = { collapse: false, isEditing: false, info: "", result: "PASS" };

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
        <td style={{ width: "90%", flexDirection: "column" }}>
          <div>
            <span>{name}</span>
            <span
              style={{ float: "right", marginRight: "0.5em" }}
              onClick={() => this.toggleInfo()}
            >
              <FontAwesomeIcon icon="chevron-down" color="grey" />
            </span>
          </div>
          <Collapse isOpen={this.state.collapse}>
            <div className="test-info">
              <div className="edit-info">
                <span
                  style={{ float: "right", cursor: "pointer" }}
                  onClick={() => null}
                >
                  <FontAwesomeIcon
                    icon="edit"
                    color="white"
                    style={{ marginRight: "0.2em" }}
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
                <pre className="language-javascript">
                  {this.state.info
                    ? this.state.info
                    : "Click edit to add test data..."}
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

interface TestResultProps {
  id: string;
  result: string;
  onUpdate: any;
}

const TestResult = (props: TestResultProps) => {
  const isPass = props.result === "PASS";

  return (
    <td style={{ width: "10%" }}>
      <ButtonGroup>
        <Button
          outline
          color={isPass ? "success" : "secondary"}
          disabled={isPass}
          onClick={() => null}
        >
          <FontAwesomeIcon icon="check" color={isPass ? "green" : "grey"} />
        </Button>
        <Button
          outline
          color={!isPass ? "danger" : "secondary"}
          disabled={!isPass}
          onClick={() => null}
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

const RemoveButton = (props: RemoveButtonProps) => (
  <span style={{ marginRight: "0.5em" }} onClick={() => null}>
    <FontAwesomeIcon icon="times" color="grey" />
  </span>
);

interface NewTestCaseRowProps {
  runid: string;
  onCreate: any;
}

const NewTestCaseRow = (props: NewTestCaseRowProps) => (
  <tr>
    <td colSpan={3}>
      <Input placeholder="New Test Name..." onKeyDown={() => null} />
    </td>
  </tr>
);

export default RunDetail;
