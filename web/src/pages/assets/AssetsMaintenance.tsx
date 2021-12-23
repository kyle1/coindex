import React, { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import styled from "styled-components";
// import CreateAsset from "./CreateAsset";
import Button from "../../components/Button";
// import Modal from "../../components/Modal";
import { apiBaseUrl } from "../../constants";
import { Asset } from "../../models/Asset";

const Container = styled.div`
  margin: 50px;
`;

interface AssetsMaintenanceProps {}

const AssetsMaintenance: React.FC<AssetsMaintenanceProps> = (props: AssetsMaintenanceProps) => {
  const [showCreateAsset, setShowCreateAsset] = useState<boolean>(false);
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
    // console.log("getting assets...");
    // fetch(`${apiBaseUrl}/assets`)
    //   .then((response) => response.json())
    //   .then(
    //     (assets) => setAssets(assets),
    //     (error) => console.log(error)
    //   );
    //for testing
    const assets: Asset[] = [
      {
        assetId: 1,
        assetName: "Bitcoin",
        ticker: "BTC",
        website: "https://bitcoin.org",
        subreddit: "r/bitcoin",
        mentions: 1536,
      },
      {
        assetId: 2,
        assetName: "Ethereum",
        ticker: "ETH",
        website: "https://ethereum.org",
        subreddit: "r/ethereum",
        mentions: 1324,
      },
      {
        assetId: 3,
        assetName: "Cardano",
        ticker: "ADA",
        website: "https://cardano.org/",
        subreddit: "r/cardano",
        mentions: 1,
      },
      {
        assetId: 4,
        assetName: "Algorand",
        ticker: "ALGO",
        website: "https://www.algorand.com/",
        subreddit: "r/AlgorandOfficial",
        mentions: 1337,
      },
      {
        assetId: 5,
        assetName: "Loopring",
        ticker: "LRC",
        website: "https://loopring.org",
        subreddit: "r/loopringorg",
        mentions: 934,
      },
    ];
    setAssets(assets);
  };

  useEffect(() => getAssets(), []);

  return (
    <>
      {/* {showCreateAsset && (
        <Modal onConfirm={() => {}} onClose={() => setShowCreateAsset(false)}>
          <CreateAsset />
        </Modal>
      )} */}
      {!showCreateAsset && (
        <Container>
          <Button onClick={() => setShowCreateAsset(true)}>New</Button>
          <DataTable
            value={assets}
            editMode="cell"
            className="editable-cells-table"
            filterDisplay="row"
            // paginator
            // paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            // currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
            // rows={20}
            // rowsPerPageOptions={[10, 20, 50]}
          >
            <Column
              field="assetName"
              header="Asset"
              headerStyle={{ width: "300px" }}
              filter
              sortable
              //editor={(options) => cellEditor(options)}
              // onCellEditComplete={handleCellEditComplete}
            />
            <Column
              field="ticker"
              header="Ticker"
              headerStyle={{ width: "300px" }}
              filter
              sortable
              //editor={(options) => cellEditor(options)}
              //onCellEditComplete={handleCellEditComplete}
            />
            <Column
              field="subreddit"
              header="Subreddit"
              headerStyle={{ width: "300px" }}
              filter
              sortable
              //editor={(options) => cellEditor(options)}
              //onCellEditComplete={handleCellEditComplete}
            />
          </DataTable>
        </Container>
      )}
    </>
  );
};

export default AssetsMaintenance;
