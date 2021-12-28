import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PortfolioAsset } from "../../models/PortfolioAsset";
import { portfolioAssets as testPortfolioAssets } from "../../testData";

const Container = styled.div`
  margin: 10px 50px;

  .p-datatable-table {
    font-size: 12px !important;
  }

  .p-sortable-column-icon {
    display: none;
  }
`;

interface PortfolioProps {}

const Portfolio: React.FC<PortfolioProps> = (props: PortfolioProps) => {
  const [portfolioAssets, setPortfolioAssets] = useState<PortfolioAsset[]>([]);

  const getPortfolio = () => {
    //for testing
    setPortfolioAssets(testPortfolioAssets);
  };

  const pctOfPortfolioTemplate = (portfolioAsset: PortfolioAsset): JSX.Element => (
    <>{portfolioAsset.percentageOfPortfolio!.toFixed(2)}%</>
  );

  const marketCapTemplate = (portfolioAsset: PortfolioAsset): JSX.Element => (
    <>{portfolioAsset.asset.marketCap!}</>
  );

  const quantityTemplate = (portfolioAsset: PortfolioAsset): JSX.Element => (
    <>{portfolioAsset.quantity.toFixed(2)}</>
  );

  const priceTemplate = (portfolioAsset: PortfolioAsset): JSX.Element => (
    <>${portfolioAsset.asset.price!.toFixed(2)}</>
  );

  const pctChange1dTemplate = (portfolioAsset: PortfolioAsset): JSX.Element => {
    const val: number = portfolioAsset.asset.pctChange1d!;
    const red: string = "#ed4d4d";
    const color: string = val > 0 ? "lightgreen" : val === 0 ? "orange" : red;
    return <span style={{ color: color }}>{val}%</span>;
  };

  const pctChange7dTemplate = (portfolioAsset: PortfolioAsset): JSX.Element => {
    const val: number = portfolioAsset.asset.pctChange7d!;
    const red: string = "#ed4d4d";
    const color: string = val > 0 ? "lightgreen" : val === 0 ? "orange" : red;
    return <span style={{ color: color }}>{val}%</span>;
  };

  const pctChange30dTemplate = (portfolioAsset: PortfolioAsset): JSX.Element => {
    const val: number = portfolioAsset.asset.pctChange30d!;
    const red: string = "#ed4d4d";
    const color: string = val > 0 ? "lightgreen" : val === 0 ? "orange" : red;
    return <span style={{ color: color }}>{val}%</span>;
  };

  useEffect(() => getPortfolio(), []);

  return (
    <Container>
      Portfolio
      <br />
      <ul>
        <li>Percentage of portfolio</li>
        <li>Quantity</li>
        <li>Price</li>
        <li>Market cap</li>
        <li>24h % change</li>
        <li>Price target</li>
        <li>Why you bought? Why sell?</li>
        <li>Conviction rating</li>
        <li>TODO: Look at RK portfolio spreadsheet for ideas</li>
      </ul>
      <br />
      <br />
      <DataTable
        value={portfolioAssets}
        // editMode="cell"
        //className="editable-cells-table"
        size="small"
        // filterDisplay="row"
        // paginator
        // paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        // currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        // rows={20}
        // rowsPerPageOptions={[10, 20, 50]}
      >
        <Column
          field="asset.assetName"
          header="Asset"
          headerStyle={{ width: "200px" }}
          //filter
          sortable
        />
        <Column
          field="asset.ticker"
          header="Ticker"
          headerStyle={{ width: "100px" }}
          //filter
          sortable
        />
        <Column
          field="percentageOfPortfolio"
          header="% Portfolio"
          headerStyle={{ width: "100px" }}
          //filter
          sortable
          body={pctOfPortfolioTemplate}
          bodyStyle={{ textAlign: "right" }}
        />
        <Column
          field="asset.marketCap"
          header="Market Cap"
          headerStyle={{ width: "100px" }}
          //filter
          sortable
          body={marketCapTemplate}
          bodyStyle={{ textAlign: "right" }}
        />
        <Column
          field="quantity"
          header="Quantity"
          headerStyle={{ width: "100px" }}
          //filter
          sortable
          body={quantityTemplate}
          bodyStyle={{ textAlign: "right" }}
        />
        <Column
          field="asset.price"
          header="Price"
          headerStyle={{ width: "100px" }}
          //filter
          sortable
          body={priceTemplate}
          bodyStyle={{ textAlign: "right" }}
        />
        <Column
          field="asset.pctChange1d"
          header="% Chg (1d)"
          headerStyle={{ width: "100px" }}
          //filter
          sortable
          body={pctChange1dTemplate}
          bodyStyle={{ textAlign: "right" }}
        />
        <Column
          field="asset.pctChange7d"
          header="% Chg (7d)"
          headerStyle={{ width: "100px" }}
          //filter
          sortable
          body={pctChange7dTemplate}
          bodyStyle={{ textAlign: "right" }}
        />
        <Column
          field="asset.pctChange30d"
          header="% Chg (30d)"
          headerStyle={{ width: "100px" }}
          //filter
          sortable
          body={pctChange30dTemplate}
          bodyStyle={{ textAlign: "right" }}
        />
        <Column
          field="convictionRating"
          header="Conviction"
          headerStyle={{ width: "100px" }}
          //filter
          sortable
          bodyStyle={{ textAlign: "right" }}
        />
        <Column
          field="holdLength"
          header="Hold Length"
          headerStyle={{ width: "100px" }}
          //filter
          sortable
        />
        <Column
          field="notes"
          header="Notes"
          headerStyle={{ width: "500px" }}
          //filter
          sortable
        />
      </DataTable>
    </Container>
  );
};

export default Portfolio;
