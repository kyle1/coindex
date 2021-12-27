import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PortfolioAsset } from "../../models/PortfolioAsset";
import { portfolioAssets as testPortfolioAssets } from "../../testData";

const Container = styled.div`
  margin: 10px;
`;

interface PortfolioProps {}

const Portfolio: React.FC<PortfolioProps> = (props: PortfolioProps) => {
  const [portfolioAssets, setPortfolioAssets] = useState<PortfolioAsset[]>([]);

  const getPortfolio = () => {
    //for testing
    setPortfolioAssets(testPortfolioAssets);
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
        className="editable-cells-table"
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
          headerStyle={{ width: "300px" }}
          filter
          sortable
        />
        <Column
          field="asset.ticker"
          header="Ticker"
          headerStyle={{ width: "300px" }}
          filter
          sortable
        />
        <Column
          field="quantity"
          header="Quantity"
          headerStyle={{ width: "300px" }}
          filter
          sortable
        />
        <Column
          field="percentageOfPortfolio"
          header="% Portfolio"
          headerStyle={{ width: "300px" }}
          filter
          sortable
        />
      </DataTable>
    </Container>
  );
};

export default Portfolio;
