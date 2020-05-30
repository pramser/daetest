import React from "react";
import { Result } from "../../types";
import { useMutate } from "restful-react";
import { ButtonGroup, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TestResultTogglerProps {
  id: string;
  result: Result;
  onUpdate: any;
}

const TestResultToggler = ({
  id,
  result,
  onUpdate,
}: TestResultTogglerProps) => {
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

export default TestResultToggler;
