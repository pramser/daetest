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

class CreateFile extends Component<
  { onCreate: any },
  { isOpen: boolean; file: any }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      isOpen: false,
      file: {}
    };

    this.handleChange = this.handleChange.bind(this);
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

  handleChange = (e: any) => {
    var file = { ...this.state.file };
    file[e.target.id] = e.target.value;
    this.setState({ file });
  };

  render() {
    var { filename, product, meta } = this.state.file;

    return (
      <div>
        <Button outline onClick={this.toggle} style={{ marginRight: '0.40em' }}>
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
                  id="filename"
                  placeholder="File Name"
                  value={filename}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Product</Label>
                <Input
                  id="product"
                  placeholder="Product"
                  value={product}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Meta</Label>
                <Input
                  id="meta"
                  placeholder="Meta"
                  value={meta}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Mutation mutation={CREATE_FILE}>
              {createFile => (
                <Button
                  onClick={() => {
                    createFile({ variables: { file: this.state.file } })
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

export default CreateFile;
