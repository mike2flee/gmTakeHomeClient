import React from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { BallTriangle } from "react-loading-icons";
import BillingSummary from "./BillingSummary";

interface TableProps {
  current: any;
  send: any;
}

const Table: React.FC<TableProps> = ({ current, send }) => {
  const defaultColDef = {
    resizable: true,
    autoHeight: true,
    filter: true,
    flex: 1,
    sortable: true,
  };

  const renderTable = () => {
    return (
      <div className="tableContainer ag-theme-alpine">
        <BillingSummary />
        <AgGridReact
          onRowDoubleClicked={(e) =>
            send("TOGGLE_MODAL", { title: "Entity Details", modalData: e.data })
          }
          rowData={current.context.timeSheetData}
          defaultColDef={defaultColDef}
        >
          <AgGridColumn field="project"></AgGridColumn>
          <AgGridColumn field="client"></AgGridColumn>
          <AgGridColumn field="hours"></AgGridColumn>
          <AgGridColumn field="billingRate"></AgGridColumn>
          <AgGridColumn field="billableHours"></AgGridColumn>
          <AgGridColumn field="billableAmount"></AgGridColumn>
        </AgGridReact>
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
