import React, { useState } from "react";

import { useMutate } from "restful-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Collapse } from "reactstrap";
import TextareaAutosize from "react-textarea-autosize";

import Prism from "prismjs";
import "../../prism.css";

import { Test, Result } from "../../types";
import { RemoveButton, TestResultToggler } from ".";

interface TestTableRowProps {
  testcase: Test;
  onDelete: any;
}

const TestTableRow = ({ testcase, onDelete }: TestTableRowProps) => {
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
    <tr>
      <TestResultToggler
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
              <TextareaAutosize
                className="edit-box"
                onChange={onChange}
                value={info}
              />
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

export default TestTableRow;
