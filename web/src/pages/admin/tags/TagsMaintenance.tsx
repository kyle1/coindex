import React, { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import styled from "styled-components";
import TagEdit from "./TagEdit";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import { apiBaseUrl } from "../../../constants";
import { AssetTag } from "../../../models/AssetTag";

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
  const [showTagEdit, setShowTagEdit] = useState<boolean>(false);
  const [assetTags, setAssetTags] = useState<any>(null);
  const [selectedTag, setSelectedTag] = useState<AssetTag | null>();

  const getTags = (): void => {
    fetch(`${apiBaseUrl}/tags`)
      .then((response) => response.json())
      .then(
        (tags) => setAssetTags(tags),
        (error) => console.log(error)
      );
  };

  const handleNewClick = (): void => {
    setSelectedTag(null);
    setShowTagEdit(true);
  };
  const handleEditClick = (tag: AssetTag): void => {
    setSelectedTag(tag);
    setShowTagEdit(true);
  };

  const handleTagSave = (): void => {
    setShowTagEdit(false);
    getTags();
  };

  const header: JSX.Element = (
    <Heading>
      Tags
      <Button onClick={() => handleNewClick()}>
        <i className="fas fa-plus" />
      </Button>
    </Heading>
  );

  const editTemplate = (tag: AssetTag): JSX.Element => (
    <Button onClick={() => handleEditClick(tag)}>
      <i className="fas fa-pencil-alt" />
    </Button>
  );

  const deleteTemplate = (tag: AssetTag): JSX.Element => (
    <Button onClick={() => console.log("TODO: delete")}>
      <i className="fas fa-trash" />
    </Button>
  );

  useEffect(() => getTags(), []);

  return (
    <>
      {showTagEdit && (
        <Modal onConfirm={() => {}} onClose={() => setShowTagEdit(false)}>
          <TagEdit
            tag={selectedTag!}
            onSave={handleTagSave}
            onCancel={() => setShowTagEdit(false)}
          />
        </Modal>
      )}
      {!showTagEdit && (
        <Container>
          <DataTable
            value={assetTags}
            //size="small"
            className="p-datatable-sm"
            header={header}
            editMode="cell"
          >
            <Column field="tagName" header="Tag" headerStyle={{ width: "500px" }} sortable />
            <Column
              field="description"
              header="Description"
              headerStyle={{ width: "500px" }}
              sortable
            />
            <Column header="Edit" body={editTemplate} sortable />
            <Column header="Delete" body={deleteTemplate} sortable />
          </DataTable>
        </Container>
      )}
    </>
  );
};

export default AssetTagsMaintenance;
