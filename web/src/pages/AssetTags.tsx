import React, { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import styled from "styled-components";
import { apiBaseUrl } from "../constants";
import { AssetTag } from "../models/AssetTag";

//for testing
const TAGS: AssetTag[] = [
  { assetTagId: 1, tagName: "Layer-1", description: "desc1" },
  { assetTagId: 2, tagName: "Layer-2", description: "desc2" },
  { assetTagId: 3, tagName: "zkRollups", description: "desc3" },
  { assetTagId: 4, tagName: "NFT", description: "desc4" },
  { assetTagId: 5, tagName: "Privacy", description: "desc5" },
];

const Container = styled.div`
  margin: 50px;
`;

interface AssetTagsProps {}

const AssetTags: React.FC<AssetTagsProps> = (props: AssetTagsProps) => {
  const [assetTags, setAssetTags] = useState<any>(null);

  const getTags = () => {
    // fetch(`${apiBaseUrl}/assets/tags`)
    //   .then((response) => response.json())
    //   .then(
    //     (tags) => setAssetTags(tags),
    //     (error) => console.log(error)
    //   );
    setAssetTags(TAGS); //for testing
  };

  useEffect(() => getTags(), []);

  return (
    <Container>
      <DataTable
        value={assetTags}
        className="p-datatable-sm p-datatable-striped"
        paginator
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        rows={20}
        rowsPerPageOptions={[10, 20, 50]}
      >
        <Column field="tagName" header="Tag" headerStyle={{ width: "100px" }} sortable />
        <Column
          field="description"
          header="Description"
          headerStyle={{ width: "300px" }}
          sortable
        />
      </DataTable>
    </Container>
  );
};

export default AssetTags;
