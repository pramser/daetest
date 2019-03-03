// Dependencies
import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

// CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CREATE_TEST_CASE = gql`
  mutation createTestCase($runid: String!, $testCase: TestCaseInput!) {
    createTestCase(runid: $runid, testCase: $testCase) {
      id
    }
  }
`;

class CreateTestCase extends Component<
  { runid: string; onCreate: any },
  { isOpen: boolean; testCase: any }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      isOpen: false,
      testCase: {}
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      testCase: {
        name: 'test_new_test__do_things',
        info: 'ERROR: something happened',
        description: 'New test for things',
        result: 'PASS'
      }
    });
  }

  handleChange = (e: any) => {
    var testCase = { ...this.state.testCase };
    testCase[e.target.id] = e.target.value;
    this.setState({ testCase });
  };

  render() {
    var { name, info, description } = this.state.testCase;

    return (
      <div>
        <Button outline onClick={this.toggle} style={{ marginRight: '0.40em' }}>
          <FontAwesomeIcon style={{ marginRight: '0.40em' }} icon="vial" />
          Create Test Case
        </Button>
        <Modal
          className="CreateTestCase"
          isOpen={this.state.isOpen}
          toggle={this.toggle}
        >
          <ModalHeader>Create Test Case</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>Name</Label>
                <Input
                  id="name"
                  placeholder="Name"
                  value={name}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Info</Label>
                <Input
                  type="textarea"
                  id="info"
                  placeholder="Info"
                  value={info}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <Input
                  type="textarea"
                  id="description"
                  placeholder="Description"
                  value={description}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Mutation mutation={CREATE_TEST_CASE}>
              {createTestCase => (
                <Button
                  onClick={() => {
                    createTestCase({
                      variables: {
                        runid: this.props.runid,
                        testCase: this.state.testCase
                      }
                    })
                      .then(() => this.props.onCreate())
                      .then(() => this.setState({ isOpen: false }));
                  }}
                >
                  Create Test Case
                </Button>
              )}
            </Mutation>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
}

export default CreateTestCase;
