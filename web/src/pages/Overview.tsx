import React, { useEffect } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import styled from "styled-components";
import { Asset as AssetDto } from "../models/Asset";

//for testing
let assets: AssetDto[] = [
  { assetId: 1, assetName: "Bitcoin", ticker: "BTC", subreddit: "r/bitcoin", mentions: 1536 },
  { assetId: 2, assetName: "Ethereum", ticker: "ETH", subreddit: "r/ethereum", mentions: 1324 },
  { assetId: 3, assetName: "Loopring", ticker: "LRC", subreddit: "r/loopringorg", mentions: 934 },
];

const getAssets = () => {
  console.log("fetching assets...");
};

const Container = styled.div`
  margin: 50px;
`;

interface OverviewProps {}

const Overview: React.FC<OverviewProps> = (props: OverviewProps) => {
  console.log("Overview evaluated");

  useEffect(() => {
    getAssets();
  }, []);

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
