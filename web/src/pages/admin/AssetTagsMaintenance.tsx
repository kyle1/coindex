import React, { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import styled from "styled-components";
// import { apiBaseUrl } from "../../constants";
import { tags } from "../../testData";

const Container = styled.div`
  margin: 50px;
`;

interface AssetTagsMaintenanceProps {}

const AssetTagsMaintenance: React.FC<AssetTagsMaintenanceProps> = (
  props: AssetTagsMaintenanceProps
) => {
  const [assetTags, setAssetTags] = useState<any>(null);

  const getTags = () => {
    // fetch(`${apiBaseUrl}/assets/tags`)
    //   .then((response) => response.json())
    //   .then(
    //     (tags) => setAssetTags(tags),
    //     (error) => console.log(error)
    //   );
    setAssetTags(tags); //for testing
  };

  useEffect(() => getTags(), []);

  return (
    <Container>
      <DataTable
        value={assetTags}
        size="small"
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

export default AssetTagsMaintenance;
