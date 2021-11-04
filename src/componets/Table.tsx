import React from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { BallTriangle } from "react-loading-icons";

interface TableProps {
  current: any;
  send: any;
}

const Table: React.FC<TableProps> = ({ current, send }) => {
  const rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
  ];

  const renderTable = () => {
    return (
      <div className="tableContainer ag-theme-alpine">
        <AgGridReact rowData={rowData}>
          <AgGridColumn field="make"></AgGridColumn>
          <AgGridColumn field="model"></AgGridColumn>
          <AgGridColumn field="price"></AgGridColumn>
        </AgGridReact>
        ;
      </div>
    );
  };

  const renderContent = () => {
    switch (true) {
      case current.matches("fetchingData"):
        return (
          <div className="loadingContainer">
            <BallTriangle
              height={150}
              width={150}
              className={"filter-green "}
            />
          </div>
        );

      default:
        return renderTable();
    }
  };

  return <>{renderContent()}</>;
};

export default Table;
