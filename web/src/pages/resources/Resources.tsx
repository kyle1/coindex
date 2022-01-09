import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { apiBaseUrl } from "../../constants";
import { Resource } from "../../models/Resource";

const Container = styled.div`
  margin: 10px;
`;

interface ResourcesProps {}

const Resources: React.FC<ResourcesProps> = (props: ResourcesProps) => {
  //const [showResourceEdit, setShowResourceEdit] = useState<boolean>(false);
  const [resources, setResources] = useState<Resource[]>([]);

  const getResources = (): void => {
    fetch(`${apiBaseUrl}/resources`)
      .then((response) => response.json())
      .then(
        (resources: Resource[]) => setResources(resources),
        (error) => console.log(error)
      );
  };

  const resourceNameTemplate = (resource: Resource): JSX.Element => (
    <a href={resource.url} target="_blank" style={{ textDecoration: "none", color: "white" }}>
      {resource.resourceName}
    </a>
  );

  const linkTemplate = (resource: Resource): JSX.Element => (
    <a href={resource.url} target="_blank" style={{ textDecoration: "none", color: "white" }}>
      {resource.url}
    </a>
  );

  useEffect(() => {
    getResources();
  }, []);

  return (
    <Container>
      <DataTable
        value={resources}
        //size="small"
        className="p-datatable-sm"
        //header={header}
        editMode="cell"
      >
        <Column
          field="resourceGroup.groupName"
          header="Group"
          headerStyle={{ width: "100px" }}
          sortable
        />
        <Column
          field="resourceName"
          header="Resource"
          headerStyle={{ width: "100px" }}
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
          headerStyle={{ width: "500px" }}
          sortable
        />
      </DataTable>
    </Container>
  );
};

export default Resources;
