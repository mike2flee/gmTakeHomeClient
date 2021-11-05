import React, { useState, useEffect } from "react";
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
  const [isViewOnly, setIsViewOnly] = useState(false);

  useEffect(() => {
    setIsViewOnly(current.context.modalTitle === "Add Entity" ? false : true);
  }, [current.context.modalTitle]);

  const isAddDisabled = () => {
    if (
      !current?.context?.modalData?.client ||
      !current?.context?.modalData?.projectCode ||
      !current?.context?.modalData?.project ||
      !current?.context?.modalData?.date ||
      !current?.context?.modalData?.firstName ||
      !current?.context?.modalData?.lastName ||
      !current?.context?.modalData?.isBillable ||
      !current?.context?.modalData?.billingRate ||
      !current?.context?.modalData?.hours
    ) {
      return true;
    }
    return false;
  };

  return (
    <Modal size="xl" show={current.context.isModalOpen}>
      <Modal.Header>
        <Modal.Title>{current.context.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormFields
          isViewOnly={isViewOnly}
          current={current}
          send={send}
        ></FormFields>
      </Modal.Body>

      <Modal.Footer>
        {!isViewOnly ? (
          <>
            <Button
              variant="outline-secondary"
              onClick={() =>
                send("TOGGLE_MODAL", { title: " ", modalData: {} })
              }
            >
              CANCEL
            </Button>
            <Button
              disabled={isAddDisabled()}
              variant="primary"
              onClick={() =>
                send("CREATE_NEW_INSTANCE", {
                  request: current.context.modalData,
                })
              }
            >
              ADD
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline-secondary"
              onClick={() =>
                send("TOGGLE_MODAL", { title: " ", modalData: {} })
              }
            >
              CLOSE
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ClientInstaceModal;
