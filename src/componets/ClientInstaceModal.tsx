import React from "react";
import { Modal, Button } from "react-bootstrap";
import FormFields from "./FormFields";

interface ClientInstaceModalProps {
  current: any;
  send: any;
}

const ClientInstaceModal: React.FC<ClientInstaceModalProps> = ({
  current,
  send,
}) => {
  return (
    <Modal size="xl" show={current.context.isModalOpen}>
      <Modal.Header>
        <Modal.Title>{current.context.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormFields current={current} send={send}></FormFields>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="outline-secondary"
          onClick={() => send("TOGGLE_MODAL", { title: "", modalData: {} })}
        >
          CANCEL
        </Button>
        <Button variant="primary">ADD</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ClientInstaceModal;
