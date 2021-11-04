import React from "react";
import { InputGroup, Dropdown } from "react-bootstrap";

interface FormFieldsProps {
  current: any;
  send: any;
}

const FormFields: React.FC<FormFieldsProps> = ({ current, send }) => {
  return (
    <>
      <InputGroup className="mb-3 inputf">
        <InputGroup.Text id="basic-addon1">Client</InputGroup.Text>
        <input
          type="text"
          className="form-control"
          value={current.context?.modalData?.client}
          onChange={(e) =>
            send("UPDATE_CREATE_FORM", {
              field: "client",
              value: e.target.value,
            })
          }
        />
      </InputGroup>
      <InputGroup className="mb-3 inputf">
        <InputGroup.Text id="basic-addon1">Project Code</InputGroup.Text>
        <input
          type="text"
          className="form-control"
          value={current?.context?.modalData?.projectCode}
          onChange={(e) =>
            send("UPDATE_CREATE_FORM", {
              field: "projectCode",
              value: e.target.value,
            })
          }
        />
      </InputGroup>
      <InputGroup className="mb-3 inputf">
        <InputGroup.Text id="basic-addon1">Project</InputGroup.Text>
        <input
          type="text"
          className="form-control"
          value={current?.current?.modalData?.project}
          onChange={(e) =>
            send("UPDATE_CREATE_FORM", {
              field: "project",
              value: e.target.value,
            })
          }
        />
      </InputGroup>
      <InputGroup className="mb-3 inputf">
        <InputGroup.Text id="basic-addon1">Date</InputGroup.Text>
        <input
          type="date"
          className="form-control"
          value={current?.current?.modalData?.date}
          onChange={(e) =>
            send("UPDATE_CREATE_FORM", {
              field: "date",
              value: e.target.value,
            })
          }
        />
      </InputGroup>
      <InputGroup className="mb-3 inputf">
        <InputGroup.Text id="basic-addon1">First Name</InputGroup.Text>
        <input
          type="text"
          className="form-control"
          value={current?.current?.modalData?.firstName}
          onChange={(e) =>
            send("UPDATE_CREATE_FORM", {
              field: "firstName",
              value: e.target.value,
            })
          }
        />
      </InputGroup>
      <InputGroup className="mb-3 inputf">
        <InputGroup.Text id="basic-addon1">Last Name</InputGroup.Text>
        <input
          type="text"
          className="form-control"
          value={current?.context?.modalData?.lastName}
          onChange={(e) =>
            send("UPDATE_CREATE_FORM", {
              field: "lastName",
              value: e.target.value,
            })
          }
        />
      </InputGroup>
      <InputGroup className="mb-3 inputf">
        <InputGroup.Text id="basic-addon1">Billable?</InputGroup.Text>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {current.context.modalData.isBillable}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                send("UPDATE_CREATE_FORM", {
                  field: "isBillable",
                  value: "Yes",
                });
              }}
            >
              Yes
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                send("UPDATE_CREATE_FORM", {
                  field: "isBillable",
                  value: "No",
                });
              }}
            >
              No
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </InputGroup>
      <InputGroup className="mb-3 inputf">
        <InputGroup.Text id="basic-addon1">Billable Rate</InputGroup.Text>
        <input
          type="number"
          className="form-control"
          value={current?.context?.modalData?.billingRate}
          onChange={(e) =>
            send("UPDATE_CREATE_FORM", {
              field: "billingRate",
              value: e.target.value,
            })
          }
        />
      </InputGroup>
      <InputGroup className="mb-3 inputf">
        <InputGroup.Text id="basic-addon1">Billable Rate</InputGroup.Text>
        <input
          type="number"
          className="form-control"
          value={current?.context?.modalData?.hours}
          onChange={(e) =>
            send("UPDATE_CREATE_FORM", {
              field: "hours",
              value: e.target.value,
            })
          }
        />
      </InputGroup>
    </>
  );
};

export default FormFields;
