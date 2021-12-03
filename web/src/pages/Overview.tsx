import React, { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import styled from "styled-components";
import { apiBaseUrl } from "../constants";
import { Asset as AssetDto } from "../models/Asset";

//for testing
let assets: AssetDto[] = [
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
