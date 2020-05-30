import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Result } from "../../types";

const ResultIcon = (props: any) => {
  if (props.status === Result.Pass)
    return <FontAwesomeIcon icon="check" color="green" />;

  if (props.status === Result.Fail)
    return <FontAwesomeIcon icon="times" color="red" />;

  return <FontAwesomeIcon icon="dot-circle" color="grey" />;
};

export default ResultIcon;
