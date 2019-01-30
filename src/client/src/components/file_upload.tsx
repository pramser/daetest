// Dependencies
import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';

class FileUpload extends Component<{}, { isOpen: boolean }> {
  constructor(props: any) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

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
          <ModalBody>Drop file here...</ModalBody>
        </Modal>
      </div>
    );
  }
}

export default FileUpload;
