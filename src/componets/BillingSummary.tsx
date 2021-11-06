import React, { useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

interface BillingSummaryProps {}

const BillingSummary: React.FC<BillingSummaryProps> = () => {
  const [radioValue, setRadioValue] = useState("1");

  return (
    <div className="billingRow">
      <div className="billingItem">
        <h4>Billable Amount:</h4>
        <h3>$xx.xx</h3>
      </div>
      <div className="billingItem">
        <h4>Hours Tracked:</h4>
        <h3>$xx.xx</h3>
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
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </div>
  );
};

export default BillingSummary;
