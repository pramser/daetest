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

export const CREATE_FILE = gql`
  mutation createFile($file: FileInput) {
    createFile(file: $file) {
      filename
    }
  }
`;

class CreateFile extends Component<{}, { isOpen: boolean; file: any }> {
  constructor(props: any) {
    super(props);

    this.state = {
      isOpen: false,
      file: {}
    };
  }

  componentDidMount() {
    this.setState({
      file: {
        filename: 'New_File',
        product: 'bullseye',
        meta: 'new'
      }
    });
  }

  render() {
    var { filename, product, meta } = this.state.file;

    return (
      <div>
        <Button outline onClick={this.toggle}>
          <FontAwesomeIcon style={{ marginRight: '0.40em' }} icon="file" />
          Create File
        </Button>
        <Modal
          className="CreateFile"
          isOpen={this.state.isOpen}
          toggle={this.toggle}
        >
          <ModalHeader>File Upload</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label>File Name</Label>
                <Input
                  name="filename"
                  placeholder="File Name"
                  value={filename}
                />
              </FormGroup>
              <FormGroup>
                <Label>Product</Label>
                <Input name="product" placeholder="Product" value={product} />
              </FormGroup>
              <FormGroup>
                <Label>Meta</Label>
                <Input name="meta" placeholder="Meta" value={meta} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Mutation mutation={CREATE_FILE}>
              {createFile => (
                <Button
                  onClick={() =>
                    createFile({ variables: { file: this.state.file } })
                  }
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

export default CreateFile;
