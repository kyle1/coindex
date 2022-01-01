import React, { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import styled from "styled-components";
import { apiBaseUrl } from "../../constants";
import { Asset } from "../../models/Asset";
import { Link } from "react-router-dom";

const Container = styled.div`
  margin: 25px;

  .p-datatable {
    font-size: 12px;
  }
`;

interface CoinsProps {}

const Coins: React.FC<CoinsProps> = (props: CoinsProps) => {
  const [assets, setAssets] = useState<Asset[]>();

  const getColor = (value: number) => {
    let color: string = value > 0 ? "lightgreen" : value === 0 ? "orange" : "#EA4C46";
    return color;
  };

  const assetTemplate = (asset: Asset): JSX.Element => (
    <Link to={`/coins/${asset.assetId}`} style={{ textDecoration: "none", color: "white" }}>
      <img src={`/images/assets/${asset.ticker}.png`} style={{ width: "15px" }} />
      {asset.assetName}
    </Link>
  );

  const priceTemplate = (asset: Asset): JSX.Element => {
    if (asset.currentPrice === null) return <></>;
    let price = "";
    if (asset.currentPrice! >= 1.0) {
      price = asset.currentPrice!.toFixed(2);
    } else if (asset.currentPrice! >= 0.1) {
      price = asset.currentPrice!.toFixed(4);
    } else if (asset.currentPrice! >= 0.01) {
      price = asset.currentPrice!.toFixed(5);
    } else if (asset.currentPrice! >= 0.001) {
      price = asset.currentPrice!.toFixed(6);
    } else {
      price = asset.currentPrice!.toFixed(7);
    }
    return <>${price}</>;
  };

  const marketCapTemplate = (asset: Asset): JSX.Element => (
    <>${asset.marketCap?.toLocaleString("en-US")}</>
  );

  const priceChangePercentage1hTemplate = (asset: Asset): JSX.Element => {
    let color = getColor(asset.priceChangePercentage1h!);
    return <span style={{ color: color }}>{asset.priceChangePercentage1h?.toFixed(2)}%</span>;
  };

  const priceChangePercentage24hTemplate = (asset: Asset): JSX.Element => {
    let color = getColor(asset.priceChangePercentage24h!);
    return <span style={{ color: color }}>{asset.priceChangePercentage24h?.toFixed(2)}%</span>;
  };

  const priceChangePercentage7dTemplate = (asset: Asset): JSX.Element => {
    let color = getColor(asset.priceChangePercentage7d!);
    return <span style={{ color: color }}>{asset.priceChangePercentage7d?.toFixed(2)}%</span>;
  };

  const priceChangePercentage30dTemplate = (asset: Asset): JSX.Element => {
    let color = getColor(asset.priceChangePercentage30d!);
    return <span style={{ color: color }}>{asset.priceChangePercentage30d?.toFixed(2)}%</span>;
  };

  const priceChangePercentage1yTemplate = (asset: Asset): JSX.Element => {
    let color = getColor(asset.priceChangePercentage1y!);
    return <span style={{ color: color }}>{asset.priceChangePercentage1y?.toFixed(0)}%</span>;
  };

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

  useEffect(() => getAssets(), []);

  return (
    <Container>
      <DataTable value={assets} className="p-datatable-sm editable-cells-table" editMode="cell">
        <Column header="Rank" field="marketCapRank" headerStyle={{ width: "100px" }} sortable />
        <Column
          header="Asset"
          headerStyle={{ width: "200px" }}
          sortable
          sortField="assetName"
          body={assetTemplate}
        />
        <Column field="ticker" header="Ticker" headerStyle={{ width: "100px" }} sortable />
        <Column
          field="currentPrice"
          header="Price"
          headerStyle={{ width: "200px" }}
          sortable
          body={priceTemplate}
          bodyStyle={{ textAlign: "right" }}
        />
        <Column
          field="marketCap"
          header="Market Cap"
          headerStyle={{ width: "300px" }}
          sortable
          body={marketCapTemplate}
          bodyStyle={{ textAlign: "right" }}
        />
        <Column
          field="priceChangePercentage1h"
          header="1h %"
          headerStyle={{ width: "100px" }}
          sortable
          body={priceChangePercentage1hTemplate}
          bodyStyle={{ textAlign: "right" }}
        />
        <Column
          field="priceChangePercentage24h"
          header="24h %"
          headerStyle={{ width: "100px" }}
          sortable
          body={priceChangePercentage24hTemplate}
          bodyStyle={{ textAlign: "right" }}
        />
        <Column
          field="priceChangePercentage7d"
          header="7d %"
          headerStyle={{ width: "100px" }}
          sortable
          body={priceChangePercentage7dTemplate}
          bodyStyle={{ textAlign: "right" }}
        />
        <Column
          field="priceChangePercentage30d"
          header="30d %"
          headerStyle={{ width: "100px" }}
          sortable
          body={priceChangePercentage30dTemplate}
          bodyStyle={{ textAlign: "right" }}
        />
        <Column
          field="priceChangePercentage1y"
          header="1y %"
          headerStyle={{ width: "100px" }}
          sortable
          body={priceChangePercentage1yTemplate}
          bodyStyle={{ textAlign: "right" }}
        />
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
  );
};

export default Coins;
