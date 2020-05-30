import React from "react";
import { Route, RouteComponentProps } from "react-router-dom";

import RunList from "./run_list";
import RunDetail from "./run_detail";

const Runs = (props: RouteComponentProps) => (
  <div>
    <Route exact path={props.match.path} component={RunList} />
    <Route path={`${props.match.url}/:runId`} component={RunDetail} />
  </div>
);

export default Runs;
