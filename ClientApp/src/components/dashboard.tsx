import React from "react";
import { Card, CardHeader, CardBody } from "reactstrap";

import { DashboardReport } from "../types";
import { useGet } from "restful-react";

const Dashboard: any = () => {
  const { loading, error, data, refetch } = useGet("dashboard");

  if (loading) {
    return "Is loading...";
  }

  if (error) {
    return "Error occurred!";
  }

  const { testsFailingCount } = data as DashboardReport;

  return (
    <div className="Dashboard">
      <button onClick={() => refetch()}>Refresh</button>
      <Card>
        <CardHeader>Test Success Breakdown</CardHeader>
        <CardBody>Hello</CardBody>
      </Card>
      <Card>
        <CardHeader>Failing Tests</CardHeader>
        <CardBody>{testsFailingCount}</CardBody>
      </Card>
    </div>
  );
};

export default Dashboard;
