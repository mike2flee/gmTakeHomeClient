import React, { useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

interface BillingSummaryProps {
  send: any;
  current: any;
}

const BillingSummary: React.FC<BillingSummaryProps> = ({ send, current }) => {
  const [radioValue, setRadioValue] = useState("1");

  return (
    <div className="billingRow">
      <div className="billingItem">
        <h4>Billable Amount:</h4>
        <h3>
          {current.context.privateMode
            ? "$xx,xxx.00"
            : current.context.totalBillableAmount}
        </h3>
      </div>
      <div className="billingItem">
        <h4>Hours Tracked:</h4>
        <h3>
          {current.context.privateMode
            ? "xx,xxx.00"
            : current.context.totalHoursTracked}
        </h3>
      </div>
      <ButtonGroup>
        {[
          { name: "Open", value: "1" },
          { name: "Private", value: "2" },
        ].map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? "outline-danger" : "outline-success"}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => {
              setRadioValue(e.currentTarget.value);
              send("TOGGLE_PRIVATE_MODE", {
                privateMode: e.currentTarget.value === "2" ? true : false,
                strict: true,
              });
            }}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default BillingSummary;
