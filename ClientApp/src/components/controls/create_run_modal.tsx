import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

interface CreateRunModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const CreateRunModal = (props: CreateRunModalProps) => {
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader>Create Run</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" id="name" placeholder="Name of run" />
          </FormGroup>
          <FormGroup>
            <Label for="product">Product</Label>
            <Input type="text" id="product" placeholder="Name of product" />
          </FormGroup>
          <FormGroup>
            <Label for="run_type">Run Type</Label>
            <Input type="select" id="run_type">
              <option>Unknown</option>
              <option>Denouer</option>
              <option>Cucumber</option>
              <option>JUnit</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="result">Result</Label>
            <Input type="select" id="result">
              <option>Unknown</option>
              <option>Pass</option>
              <option>Fail</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="file_name">File (Optional)</Label>
            <Input
              type="text"
              id="file_name"
              placeholder="location_of_file.xml"
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="warning" onClick={props.toggle}>
          Cancel
        </Button>
        <Button color="primary" onClick={() => null}>
          Create
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CreateRunModal;
