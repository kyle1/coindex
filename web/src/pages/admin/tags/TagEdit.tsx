import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import styled from "styled-components";
import Button from "../../../components/Button";
import { apiBaseUrl } from "../../../constants";
import { AssetTag } from "../../../models/AssetTag";

const Container = styled.div`
  margin: 10px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface TagEditProps {
  tag: AssetTag;
  onSave: () => void;
  onCancel: () => void;
}

const TagEdit: React.FC<TagEditProps> = (props: TagEditProps) => {
  const [tagName, setTagName] = useState<string>(props.tag?.tagName);
  const [description, setDescription] = useState<string>(props.tag?.description);

  const handleSaveClick = () => {
    //TODO: validate, then save.
    const tag: AssetTag = {
      assetTagId: props.tag?.assetTagId ?? 0,
      tagName: tagName,
      description: description,
    };

    if (tag.assetTagId === 0) {
      createTag(tag);
    } else {
      updateTag(tag);
    }
  };

  const createTag = (tag: AssetTag) => {
    let options: any = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tag),
    };
    fetch(`${apiBaseUrl}/tags`, options)
      .then((response) => console.log(response))
      .then(
        () => props.onSave(),
        (error) => console.log(error)
      );
  };

  const updateTag = (tag: AssetTag): void => {
    let options: any = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tag),
    };
    fetch(`${apiBaseUrl}/tags/${tag.assetTagId}`, options)
      .then((response) => console.log(response))
      .then(
        () => props.onSave(),
        (error) => console.log(error)
      );
  };

  return (
    <Container>
      <b>New Tag</b>
      <br />
      <br />
      Tag*:
      <br />
      <InputText
        type="text"
        value={tagName}
        style={{ width: "300px" }}
        onChange={(e) => setTagName(e.target.value)}
      ></InputText>
      <br />
      <br />
      Description*:
      <br />
      <InputText
        type="text"
        value={description}
        style={{ width: "300px" }}
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

export default TagEdit;
