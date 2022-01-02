import React, { useEffect, useState } from "react";
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
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 26px;
`;

interface AssetsMaintenanceProps {}

const AssetsMaintenance: React.FC<AssetsMaintenanceProps> = (props: AssetsMaintenanceProps) => {
  const [showAssetEdit, setShowAssetEdit] = useState<boolean>(false);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>();

  const getAssets = (): void => {
    fetch(`${apiBaseUrl}/assets`)
      .then((response) => response.json())
      .then(
        (assets) => {
          console.log(assets);
          setAssets(assets);
        },
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
      <img src={`/images/assets/${asset.ticker}.png`} style={{ width: "15px" }} />
      {asset.assetName}
    </>
  );

  const websiteTemplate = (asset: Asset): JSX.Element => (
    <a
      href={asset.website}
      target="_blank"
      className="fas fa-bookmark"
      style={{ textDecoration: "none", color: "white" }}
    ></a>
  );

  const subredditTemplate = (asset: Asset): JSX.Element => (
    <a
      href={"http://www.reddit.com/" + asset.subreddit}
      target="_blank"
      className="fab fa-reddit-alien"
      style={{ textDecoration: "none", color: "white" }}
    ></a>
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
        style={{ textDecoration: "none", color: "white" }}
      ></a>
    </>
  );

  const editTemplate = (asset: Asset): JSX.Element => (
    <Button onClick={() => handleEditClick(asset)}>
      <i className="fas fa-pencil-alt" />
    </Button>
  );

  const deleteTemplate = (asset: Asset): JSX.Element => (
    <Button onClick={() => console.log("TODO: delete")}>
      <i className="fas fa-trash" />
    </Button>
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
          <DataTable
            value={assets}
            className="p-datatable-sm editable-cells-table"
            header={header}
            editMode="cell"
          >
            <Column
              header="Asset"
              headerStyle={{ width: "300px" }}
              sortable
              sortField="assetName"
              body={assetTemplate}
            />
            <Column field="ticker" header="Ticker" headerStyle={{ width: "300px" }} sortable />
            {/* <Column
              field="website"
              header="Website"
              headerStyle={{ width: "300px" }}
              filter
              sortable
              body={websiteTemplate}
            />
            <Column
              field="subreddit"
              header="Subreddit"
              headerStyle={{ width: "300px" }}
              filter
              sortable
              body={subredditTemplate}
            /> */}
            <Column
              header="Links"
              headerStyle={{ width: "300px" }}
              //filter
              //sortable
              body={linksTemplate}
            />
            <Column header="Edit" body={editTemplate} sortable />
            <Column header="Delete" body={deleteTemplate} sortable />
          </DataTable>
        </Container>
      )}
    </>
  );
};

export default AssetsMaintenance;
