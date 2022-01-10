import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import styled from "styled-components";
import Button from "../../../components/Button";
import { ResourceGroup } from "../../../models/ResourceGroup";
import { Resource } from "../../../models/Resource";
import { apiBaseUrl } from "../../../constants";

const Container = styled.div`
  margin: 10px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface ResourceEditProps {
  resource: Resource;
  onSave: () => void;
  onCancel: () => void;
}

const ResourceEdit: React.FC<ResourceEditProps> = (props: ResourceEditProps) => {
  console.log("Evaluating ResourceEdit...");
  console.log(props);
  const [resourceGroups, setResourceGroups] = useState<ResourceGroup[]>([]);
  const [resourceName, setResourceName] = useState<string>(props.resource?.resourceName);
  const [selectedGroup, setSelectedGroup] = useState<ResourceGroup>(props.resource?.resourceGroup!);
  const [url, setUrl] = useState<string>(props.resource?.url);
  const [description, setDescription] = useState<string | undefined>(props.resource?.description);

  const getResourceGroups = (): void => {
    fetch(`${apiBaseUrl}/resources/groups`)
      .then((response) => response.json())
      .then(
        (groups: ResourceGroup[]) => setResourceGroups(groups),
        (error) => console.log(error)
      );
  };

  const createResource = (resource: Resource): void => {
    let options: any = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resource),
    };
    fetch(`${apiBaseUrl}/resources`, options)
      .then((response) => console.log(response))
      .then(
        () => props.onSave(),
        (error) => console.log(error)
      );
  };

  const updateResource = (resource: Resource): void => {
    let options: any = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resource),
    };
    fetch(`${apiBaseUrl}/resources/${resource.resourceId}`, options)
      .then((response) => console.log(response))
      .then(
        () => props.onSave(),
        (error) => console.log(error)
      );
  };

  const handleSaveClick = (): void => {
    //TODO: validate, then save.
    const resource: Resource = {
      resourceId: props.resource?.resourceId ?? 0,
      resourceName: resourceName,
      resourceGroupId: selectedGroup!.resourceGroupId,
      url: url,
      description: description,
    };

    if (resource.resourceId === 0) {
      createResource(resource);
    } else {
      updateResource(resource);
    }
  };

  useEffect(() => getResourceGroups(), []);

  return (
    <Container>
      <b>{props.resource ? "Edit" : "New"} Resource</b>
      <br />
      <br />
      Resource name*:
      <br />
      <InputText
        type="text"
        value={resourceName}
        style={{ width: "100%" }}
        onChange={(e) => setResourceName(e.target.value)}
      ></InputText>
      <br />
      <br />
      Resource group*:
      <br />
      <Dropdown
        value={selectedGroup}
        options={resourceGroups}
        optionLabel="groupName"
        onChange={(e: any) => setSelectedGroup(e.value)}
        placeholder="Select a group"
        style={{ width: "100%" }}
      />
      <br />
      <br />
      URL:
      <br />
      <InputText
        type="text"
        value={url}
        style={{ width: "100%" }}
        onChange={(e) => setUrl(e.target.value)}
      ></InputText>
      <br />
      <br />
      Description:
      <br />
      <InputText
        type="text"
        value={description}
        style={{ width: "100%" }}
        onChange={(e) => setDescription(e.target.value)}
      ></InputText>
      <br />
      <br />
      <Footer>
        <Button onClick={props.onCancel}>Cancel</Button>
        <Button onClick={() => handleSaveClick()}>Save</Button>
      </Footer>
    </Container>
  );
};

export default ResourceEdit;
