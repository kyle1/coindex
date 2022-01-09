import React, { useEffect, useState } from "react";
import { Button as PrimeButton } from "primereact/button";
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

  .p-datatable {
    font-size: 13px;
  }
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
        (tags: AssetTag[]) => setAssetTags(tags),
        (error) => console.log(error)
      );
  };

  const deleteTag = (id: number): void => {
    let options: any = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: null,
    };
    fetch(`${apiBaseUrl}/assets/tags/${id}`, options)
      .then((response) => console.log(response))
      .then(
        () => getTags(),
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

  const actionBodyTemplate = (tag: AssetTag): JSX.Element => (
    <>
      <PrimeButton
        icon="pi pi-pencil"
        className="p-button-rounded p-button-success"
        style={{ height: "30px", width: "30px", marginRight: "15px" }}
        onClick={() => handleEditClick(tag)}
      />
      <PrimeButton
        icon="pi pi-trash"
        className="p-button-rounded p-button-warning"
        style={{ height: "30px", width: "30px" }}
        onClick={() => deleteTag(tag.assetTagId)}
      />
    </>
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
            <Column header="" body={actionBodyTemplate} sortable />
          </DataTable>
        </Container>
      )}
    </>
  );
};

export default AssetTagsMaintenance;
