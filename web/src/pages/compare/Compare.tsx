import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { apiBaseUrl } from "../../constants";
import { Asset } from "../../models/Asset";
import { SectionCategory } from "../../models/SectionCategory";

const Container = styled.div`
  margin: 10px;
`;

interface CompareProps {}

const CompareProps: React.FC<CompareProps> = (props: CompareProps) => {
  const [assets, setAssets] = useState<Asset[]>([]);

  const getCategories = () => {
    fetch(`${apiBaseUrl}/sections/categories`)
      .then((response) => response.json())
      .then(
        (categories: SectionCategory[]) => {
          console.log(categories);
        },
        (error) => console.log(error)
      );
  };

  const getAssets = () => {
    fetch(`${apiBaseUrl}/assets`)
      .then((response) => response.json())
      .then(
        (assets: Asset[]) => {
          //for testing:
          let testAssets = assets.filter(
            (asset) => asset.ticker === "BTC" || asset.ticker === "ETH"
          );
          setAssets(testAssets);
        },
        (error) => console.log(error)
      );
  };

  const dynamicColumns = (): JSX.Element => {
    let cols = assets.map((asset) => <Column key={asset.assetId} header={asset.assetName} />);
    return <>{cols}</>;
  };

  useEffect(() => {
    getCategories();
    getAssets();
  }, []);

  return (
    <Container>
      {assets.map((asset) => (
        <div>{asset.assetName}</div>
      ))}
      <br />
      <br />
      <DataTable>{dynamicColumns}</DataTable>
    </Container>
  );
};

export default CompareProps;
