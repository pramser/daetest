// Dependencies
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';

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
        <Button onClick={this.toggle}>Upload File</Button>
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
