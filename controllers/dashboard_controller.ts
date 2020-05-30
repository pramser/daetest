export function getDashboard({ response }: any) {
  response.body = {
    testsTotal: 762,
    testsFailingCount: 64,
    testsAddedInThirtyDays: 45,
  };
}
