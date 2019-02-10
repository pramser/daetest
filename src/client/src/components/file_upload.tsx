// Dependencies
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

// CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      filename
    }
  }
`;

class FileUpload extends Component<{}, { isOpen: boolean }> {
  constructor(props: any) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  render() {
    return (
      <div>
        <Button outline onClick={this.toggle}>
          <FontAwesomeIcon style={{ marginRight: '0.40em' }} icon="file" />
          Upload File
        </Button>
        <Modal
          className="FileUpload"
          isOpen={this.state.isOpen}
          toggle={this.toggle}
        >
          <ModalHeader>File Upload</ModalHeader>
          <ModalBody>
            <Dropzone accept="image/*" onDrop={this.onDrop}>
              {({
                getRootProps,
                getInputProps,
                isDragAccept,
                isDragReject
              }) => {
                return (
                  <div {...getRootProps()} className="dropzone">
                    <input {...getInputProps()} />
                    <div>{isDragAccept ? 'Drop' : 'Drag'} files here...</div>
                    {isDragReject && <div>Unsupported file type...</div>}
                  </div>
                );
              }}
            </Dropzone>
          </ModalBody>
          <ModalFooter>
            <Mutation mutation={UPLOAD_FILE}>
              {uploadFile => (
                <Button onClick={() => uploadFile({ variables: {} })}>
                  Upload File
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

  onDrop = (acceptedFiles: any, rejectedFiles: any) => {
    console.log('Dropped file...');
  };
}

export default FileUpload;
