import React, { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import styled from "styled-components";
import CreateTag from "./CreateTag";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import { apiBaseUrl } from "../../../constants";

const Container = styled.div`
  margin: 10px;
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 26px;
`;

interface AssetTagsMaintenanceProps {}

const AssetTagsMaintenance: React.FC<AssetTagsMaintenanceProps> = (
  props: AssetTagsMaintenanceProps
) => {
  const [showCreateTag, setShowCreateTag] = useState<boolean>(false);
  const [assetTags, setAssetTags] = useState<any>(null);

  const getTags = () => {
    fetch(`${apiBaseUrl}/tags`)
      .then((response) => response.json())
      .then(
        (tags) => setAssetTags(tags),
        (error) => console.log(error)
      );
  };

  const header = (
    <Heading>
      Tags
      <Button onClick={() => setShowCreateTag(true)}>New</Button>
    </Heading>
  );

  useEffect(() => getTags(), []);

  return (
    <>
      {showCreateTag && (
        <Modal onConfirm={() => {}} onClose={() => setShowCreateTag(false)}>
          <CreateTag />
        </Modal>
      )}
      {!showCreateTag && (
        <Container>
          <DataTable
            value={assetTags}
            //size="small"
            className="p-datatable-sm"
            header={header}
            editMode="cell"
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
      )}
    </>
  );
};

export default AssetTagsMaintenance;
