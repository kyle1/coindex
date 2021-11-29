import React, { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import styled from "styled-components";
import { apiBaseUrl } from "../../constants";
import { Asset } from "../../models/Asset";

const Container = styled.div`
  margin: 50px;
`;

interface AssetsMaintenanceProps {}

const AssetsMaintenance: React.FC<AssetsMaintenanceProps> = (props: AssetsMaintenanceProps) => {
  const [assets, setAssets] = useState<Asset[]>();
  const [editingRows, setEditingRows] = useState<any>();

  const handleRowEditChange = (e: any) => setEditingRows(e.data);

  const handleRowEditComplete = (e: any) => {
    let assetsCopy = [...(assets as Asset[])];
    setEditingRows(assetsCopy);
  };

  const cellEditor = (options: any) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const handleCellEditComplete = (e: any) => {
    let { rowData, newValue, field, originalEvent: event } = e;
    switch (field) {
      case "dummy1":
      case "dummy2":
        break;
      default:
        if (newValue.trim().length > 0) rowData[field] = newValue;
        else event.preventDefault();
        break;
    }
  };

  const getAssets = () => {
    fetch(`${apiBaseUrl}/assets`)
      .then((response) => response.json())
      .then(
        (assets) => setAssets(assets),
        (error) => console.log(error)
      );
  };

  useEffect(() => getAssets(), []);

  return (
    <Container>
      {/* <DataTable
        value={assets}
        className="p-datatable-sm p-datatable-striped"
        editMode="row"
        dataKey="assetId"
        editingRows={editingRows}
        onRowEditChange={handleRowEditChange}
        onRowEditComplete={handleRowEditComplete}
        paginator
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        rows={20}
        rowsPerPageOptions={[10, 20, 50]}
      >
        <Column field="assetName" header="Asset" headerStyle={{ width: "300px" }} sortable />
        <Column field="ticker" header="Ticker" headerStyle={{ width: "300px" }} sortable />
        <Column field="subreddit" header="Subreddit" headerStyle={{ width: "300px" }} sortable />
      </DataTable> */}
      <DataTable
        value={assets}
        className="p-datatable-striped editable-cells-table"
        editMode="cell"
        filterDisplay="row"
        paginator
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        rows={20}
        rowsPerPageOptions={[10, 20, 50]}
      >
        <Column
          field="assetName"
          header="Asset"
          headerStyle={{ width: "300px" }}
          sortable
          editor={(options) => cellEditor(options)}
          onCellEditComplete={handleCellEditComplete}
        />
        <Column
          field="ticker"
          header="Ticker"
          headerStyle={{ width: "300px" }}
          sortable
          editor={(options) => cellEditor(options)}
          onCellEditComplete={handleCellEditComplete}
        />
        <Column
          field="subreddit"
          header="Subreddit"
          headerStyle={{ width: "300px" }}
          sortable
          editor={(options) => cellEditor(options)}
          onCellEditComplete={handleCellEditComplete}
        />
      </DataTable>
    </Container>
  );
};

export default AssetsMaintenance;
