import React, { useEffect, useState } from "react";
import { Button as PrimeButton } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import styled from "styled-components";
import AssetEdit from "./AssetEdit";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import { apiBaseUrl } from "../../../constants";
import { Asset } from "../../../models/Asset";

const Container = styled.div`
  margin: 10px;

  .p-datatable {
    font-size: 13px;
  }
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 26px;
`;

interface AssetsMaintenanceProps {}

const AssetsMaintenance: React.FC<AssetsMaintenanceProps> = (props: AssetsMaintenanceProps) => {
  console.log("Evaluating AssetsMaintenance...");
  console.log(props);
  const [showAssetEdit, setShowAssetEdit] = useState<boolean>(false);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>();

  const getAssets = (): void => {
    fetch(`${apiBaseUrl}/assets`)
      .then((response) => response.json())
      .then(
        (assets: Asset[]) => setAssets(assets),
        (error) => console.log(error)
      );
  };

  const deleteAsset = (id: number): void => {
    let options: any = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: null,
    };
    fetch(`${apiBaseUrl}/assets/${id}`, options)
      .then((response) => console.log(response))
      .then(
        () => getAssets(),
        (error) => console.log(error)
      );
  };

  const handleNewClick = (): void => {
    setSelectedAsset(null);
    setShowAssetEdit(true);
  };

  const handleEditClick = (asset: Asset): void => {
    setSelectedAsset(asset);
    setShowAssetEdit(true);
  };

  const handleAssetSave = (): void => {
    setShowAssetEdit(false);
    getAssets();
  };

  const header: JSX.Element = (
    <Heading>
      Assets
      <Button onClick={() => handleNewClick()}>
        <i className="fas fa-plus" />
      </Button>
    </Heading>
  );

  const assetTemplate = (asset: Asset): JSX.Element => (
    <>
      <img
        src={`/images/assets/${asset.ticker}.png`}
        style={{ width: "22px", paddingRight: "2px" }}
      />
      {asset.assetName}
    </>
  );

  const linksTemplate = (asset: Asset): JSX.Element => (
    <>
      <a
        href={asset.website}
        target="_blank"
        className="fas fa-bookmark"
        style={{ textDecoration: "none", color: "white", paddingRight: "10px" }}
      ></a>
      <a
        href={"http://www.reddit.com/" + asset.subreddit}
        target="_blank"
        className="fab fa-reddit-alien"
        style={{ textDecoration: "none", color: "white", paddingRight: "10px" }}
      ></a>
      <a
        href={"http://www.reddit.com/" + asset.subreddit}
        target="_blank"
        className="fab fa-twitter"
        style={{ textDecoration: "none", color: "white", paddingRight: "10px" }}
      ></a>
      <a
        href={
          "http://www.coinmarketcap.com/currencies/" +
          asset.assetName.replace(" ", "-").replace(".", "-").toLowerCase()
        }
        target="_blank"
        style={{ textDecoration: "none", color: "white", paddingRight: "10px" }}
      >
        <img src={`/images/cmc.png`} width="20px" style={{ verticalAlign: "bottom" }} />
      </a>
    </>
  );

  const actionBodyTemplate = (asset: Asset): JSX.Element => (
    <>
      <PrimeButton
        icon="pi pi-pencil"
        className="p-button-rounded p-button-success"
        style={{ height: "30px", width: "30px", marginRight: "15px" }}
        onClick={() => handleEditClick(asset)}
      />
      <PrimeButton
        icon="pi pi-trash"
        className="p-button-rounded p-button-warning"
        style={{ height: "30px", width: "30px" }}
        onClick={() => deleteAsset(asset.assetId)}
      />
    </>
  );

  useEffect(() => getAssets(), []);

  return (
    <>
      {showAssetEdit && (
        <Modal onConfirm={() => {}} onClose={() => setShowAssetEdit(false)}>
          <AssetEdit
            asset={selectedAsset!}
            onSave={handleAssetSave}
            onCancel={() => setShowAssetEdit(false)}
          />
        </Modal>
      )}
      {!showAssetEdit && (
        <Container>
          <DataTable value={assets} className="p-datatable-sm editable-cells-table" header={header}>
            <Column
              header="Asset"
              headerStyle={{ width: "300px" }}
              sortable
              sortField="assetName"
              body={assetTemplate}
            />
            <Column field="ticker" header="Ticker" headerStyle={{ width: "300px" }} sortable />
            <Column header="Links" headerStyle={{ width: "300px" }} body={linksTemplate} />
            <Column body={actionBodyTemplate} sortable />
          </DataTable>
        </Container>
      )}
    </>
  );
};

export default AssetsMaintenance;
