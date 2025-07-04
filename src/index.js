import React, { useState } from "react";
import ReactDOM from "react-dom";
import { AllModules } from "@ag-grid-enterprise/all-modules";
import { AgGridReact } from "@ag-grid-community/react";
import { DataSource } from "./DataSource";

import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";
import "./styles.css";
import { CellRenderer } from "./CellRenderer";

const gridOptions = {
  domLayout: "autoHeight",

  headerHeight: 100,
  rowModelType: "serverSide",
  treeData: true,
  animateRows: true,
  suppressContextMenu: true,
  suppressPaginationPanel: true,
  suppressScrollOnNewData: true,
  suppressMenuHide: true,
  isServerSideGroup: dataItem => {
    if (dataItem && dataItem.children.length > 0) return true;
    return false;
  },
  getServerSideGroupKey: dataItem => dataItem.name
};

function App() {
  const [gridApi, setGridApi] = useState();
  let datasource;

  const listGuides = api => {
    if (!datasource) {
      datasource = new DataSource(gridOptions);
    }
    api.setServerSideDatasource(datasource);
    api.sizeColumnsToFit();
  };

  const onGridReady = params => {
    setGridApi(params.api);
    listGuides(params.api);
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        id="myGrid"
        style={{
          height: "100%",
          width: "100%"
        }}
        className="ag-theme-balham"
      >
        <AgGridReact
          modules={AllModules}
          gridOptions={gridOptions}
          columnDefs={[
            {
              field: "value",
              rowGroup: true,
              headerName: "Value",
              autoHeight: true
              // cellClass: 'whiteSpace'
            }
          ]}
          onGridReady={onGridReady}
          autoGroupColumnDef={{
            field: "name",
            headerName: "Auto Group",
            // Delete this line to use the default cell and there will be no bug with the autoHeight
            // Otherwise, autoHeight will not be set
            cellRendererFramework: CellRenderer,
            autoHeight: true,
            cellClass: "whiteSpace "
          }}
        />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
