# daetest

Test results, coverage, and metrics aggregator.

## The Purpose

The state of test case and test results management is difficult nowadays. There are plenty of tools for tracking issues or changes in your software, but not a whole ton for bridging the gap between those issues and the tests you may be running for them.

Enter _daetest_.

_Daetest_ is a test management solution that allows the express creation of new test cases your Quality Assurance (QA) professionals may be running and the import of existing tests across a range of languages and toolsets. This means you can have your UAT done in Cucumber while the same backend tests get imported alongside those suites for your QA to make decisions on as a whole.

The idea is to quickly enable QA to view, share, and build on test data across a range of products so they can easily make confident decisions on the quality of your code. In this same vein, _Daetest_ also has detailed metrics for your test cases that provides a view of the types of tests you're running and how they're performing. Gaps in your testing efforts will also start to surface as you provide more and more data for _Daetest_ to consider.

## Installation

Coming soon...

## Contributing

After installing [_Docker_](https://docker.com/) and [_Yarn_](https://yarnpkg.com/), just pull the packages for the part of _Daetest_ you want to work in and run `yarn start`.

```bash
# I want to develop for the client.
cd src/client
yarn
yarn start

# I want to develop for the server.
cd src/server
yarn
yarn start
```

Since the code lives in a mono-repo it's easy to run the whole stack on the same machine. The development client is already pointed at the server.
