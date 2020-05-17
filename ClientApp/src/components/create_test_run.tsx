// Dependencies
import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

// CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CREATE_TEST_RUN = gql`
  mutation createTestRun($testrun: TestRunInput) {
    createTestRun(testrun: $testrun) {
      filename
    }
  }
`;

class CreateTestRun extends Component<
  { onCreate: any },
  { isOpen: boolean; testRun: any }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      isOpen: false,
      testRun: {},
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      testRun: {
        filename: 'New_File',
        product: 'bullseye',
        meta: 'new',
        type: 'TESTMON',
      },
    });
  }

  handleChange = (e: any) => {
    var testRun = { ...this.state.testRun };
    testRun[e.target.id] = e.target.value;
    this.setState({ testRun });
  };

  render() {
    var { filename, product, meta, type } = this.state.testRun;

    return (
      <div>
        <Button
          outline
          size="sm"
          onClick={this.toggle}
          style={{ marginRight: '0.40em' }}
        >
          <FontAwesomeIcon style={{ marginRight: '0.40em' }} icon="file" />
          Create Test Run
        </Button>
        <Modal
          className="CreateTestRun"
          isOpen={this.state.isOpen}
          toggle={this.toggle}
        >
          <ModalHeader>Create Test Run</ModalHeader>
          <ModalBody>
            <Form>
              <Row>
                <Col md={8}>
                  <FormGroup>
                    <Label>File Name</Label>
                    <Input
                      id="filename"
                      placeholder="File Name"
                      value={filename}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label>Type</Label>
                    <Input
                      id="type"
                      placeholder="Type"
                      type="select"
                      value={type}
                      onChange={this.handleChange}
                    >
                      <option>NONE</option>
                      <option>TESTMON</option>
                      <option>JUNIT</option>
                      <option>CUCUMBER</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label>Product</Label>
                    <Input
                      id="product"
                      placeholder="Product"
                      value={product}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Meta</Label>
                    <Input
                      id="meta"
                      placeholder="Meta"
                      value={meta}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Mutation mutation={CREATE_TEST_RUN}>
              {(createTestRun: any) => (
                <Button
                  size="sm"
                  color="primary"
                  onClick={() => {
                    createTestRun({
                      variables: { testrun: this.state.testRun },
                    })
                      .then(() => this.props.onCreate())
                      .then(() => this.setState({ isOpen: false }));
                  }}
                >
                  Create File
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

export default CreateTestRun;
