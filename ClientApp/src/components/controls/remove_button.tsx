import React from "react";
import { useMutate } from "restful-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

export default RemoveButton;
