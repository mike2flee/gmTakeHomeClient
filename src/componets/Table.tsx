import React from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

interface TableProps {
  current: any;
  send: any;
}

const Table: React.FC<TableProps> = () => {
  const rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
  ];

  return (
    <div className="tableContainer ag-theme-alpine">
      <AgGridReact rowData={rowData}>
        <AgGridColumn field="make"></AgGridColumn>
        <AgGridColumn field="model"></AgGridColumn>
        <AgGridColumn field="price"></AgGridColumn>
      </AgGridReact>
    </div>
  );
};

export default Table;