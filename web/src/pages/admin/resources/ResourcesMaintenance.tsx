import React, { useEffect, useState } from "react";
import { Button as PrimeButton } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import styled from "styled-components";
import Button from "../../../components/Button";
import { apiBaseUrl } from "../../../constants";
import { Resource } from "../../../models/Resource";
import Modal from "../../../components/Modal";
import ResourceEdit from "./ResourceEdit";

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

interface ResourcesMaintenanceProps {}

const ResourcesMaintenance: React.FC<ResourcesMaintenanceProps> = (
  props: ResourcesMaintenanceProps
) => {
  console.log("Evaluating ResourcesMaintenance...");
  console.log(props);
  const [showResourceEdit, setShowResourceEdit] = useState<boolean>(false);
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>();

  const getResources = (): void => {
    fetch(`${apiBaseUrl}/resources`)
      .then((response) => response.json())
      .then(
        (resources: Resource[]) => setResources(resources),
        (error) => console.log(error)
      );
  };

  const deleteResource = (id: number): void => {
    let options: any = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: null,
    };
    fetch(`${apiBaseUrl}/resources/${id}`, options)
      .then((response) => console.log(response))
      .then(
        () => getResources(),
        (error) => console.log(error)
      );
  };

  const header: JSX.Element = (
    <Heading>
      Resources
      <Button onClick={() => handleNewClick()}>
        <i className="fas fa-plus" />
      </Button>
    </Heading>
  );

  const handleNewClick = (): void => {
    setSelectedResource(null);
    setShowResourceEdit(true);
  };

  const handleEditClick = (resource: Resource): void => {
    setSelectedResource(resource);
    setShowResourceEdit(true);
  };

  const handleResourceSave = (): void => {
    setShowResourceEdit(false);
    getResources();
  };

  const resourceNameTemplate = (resource: Resource): JSX.Element => (
    <a href={resource.url} target="_blank" style={{ textDecoration: "none", color: "white" }}>
      {resource.resourceName}
    </a>
  );

  const actionBodyTemplate = (resource: Resource): JSX.Element => (
    <>
      <PrimeButton
        icon="pi pi-pencil"
        className="p-button-rounded p-button-success"
        style={{ height: "30px", width: "30px", marginRight: "15px" }}
        onClick={() => handleEditClick(resource)}
      />
      <PrimeButton
        icon="pi pi-trash"
        className="p-button-rounded p-button-warning"
        style={{ height: "30px", width: "30px" }}
        onClick={() => deleteResource(resource.resourceId)}
      />
    </>
  );

  useEffect(() => getResources(), []);

  return (
    <>
      {showResourceEdit && (
        <Modal onConfirm={() => {}} onClose={() => setShowResourceEdit(false)}>
          <ResourceEdit
            resource={selectedResource!}
            onSave={handleResourceSave}
            onCancel={() => setShowResourceEdit(false)}
          />
        </Modal>
      )}
      {!showResourceEdit && (
        <Container>
          <DataTable value={resources} className="p-datatable-sm" header={header}>
            <Column
              field="resourceGroup.groupName"
              header="Group"
              headerStyle={{ width: "200px" }}
              sortable
            />
            <Column
              field="resourceName"
              header="Resource"
              headerStyle={{ width: "200px" }}
              body={resourceNameTemplate}
              sortable
            />
            {/* <Column
          field="url"
          header="Link"
          headerStyle={{ width: "300px" }}
          body={linkTemplate}
          sortable
        /> */}
            <Column
              field="description"
              header="Description"
              headerStyle={{ width: "800px" }}
              sortable
            />
            <Column body={actionBodyTemplate} bodyStyle={{ textAlign: "right" }} sortable />
          </DataTable>
        </Container>
      )}
    </>
  );
};

export default ResourcesMaintenance;
