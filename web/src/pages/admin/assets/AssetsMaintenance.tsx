import React, { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import styled from "styled-components";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import CreateAsset from "./CreateAsset";
import { Asset } from "../../../models/Asset";
import { apiBaseUrl } from "../../../constants";

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
  const [showCreateAsset, setShowCreateAsset] = useState<boolean>(false);
  const [assets, setAssets] = useState<Asset[]>();

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

  const getAssets = () => {
    console.log("getting assets...");
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

  const header = (
    <Heading>
      Assets
      <Button onClick={() => setShowCreateAsset(true)}>New</Button>
    </Heading>
  );

  useEffect(() => getAssets(), []);

  return (
    <>
      {showCreateAsset && (
        <Modal onConfirm={() => {}} onClose={() => setShowCreateAsset(false)}>
          <CreateAsset />
        </Modal>
      )}
      {!showCreateAsset && (
        <Container>
          <DataTable
            value={assets}
            className="p-datatable-sm editable-cells-table"
            header={header}
            editMode="cell"
          >
            <Column
              header="Asset"
              headerStyle={{ width: "200px" }}
              sortable
              sortField="assetName"
              body={assetTemplate}
            />
            <Column field="ticker" header="Ticker" headerStyle={{ width: "100px" }} sortable />
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
          </DataTable>
        </Container>
      )}
    </>
  );
};

export default AssetsMaintenance;
