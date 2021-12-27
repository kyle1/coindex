import React, { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import styled from "styled-components";
import { apiBaseUrl } from "../constants";
import { Asset as AssetDto } from "../models/Asset";

const Container = styled.div`
  margin: 50px;
`;

interface OverviewProps {}

const Overview: React.FC<OverviewProps> = (props: OverviewProps) => {
  console.log("Overview evaluated");
  const [assets, setAssets] = useState<any>([]);

  useEffect(() => {
    getAssets();
  }, []);

  const getAssets = () => {
    console.log("fetching assets...");
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

  const viewTemplate = (asset: AssetDto) => {
    return <>View</>;
  };

  return (
    <Container>
      <DataTable value={assets} responsiveLayout="scroll">
        <Column field="assetName" header="Asset" />
        <Column field="ticker" header="Ticker" />
        <Column field="subreddit" header="Subreddit" />
        <Column field="mentions" header="Mentions" style={{ textAlign: "right" }} />
        <Column header="" body={viewTemplate} />
      </DataTable>
    </Container>
  );
};

export default Overview;
