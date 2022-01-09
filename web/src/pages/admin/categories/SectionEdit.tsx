import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import styled from "styled-components";
import Button from "../../../components/Button";
import { apiBaseUrl } from "../../../constants";
import { Section } from "../../../models/Section";

const Container = styled.div`
  margin: 10px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface SectionEditProps {
  section: Section;
  onSave: () => void;
  onCancel: () => void;
}

const SectionEdit: React.FC<SectionEditProps> = (props: SectionEditProps) => {
  const [title, setTitle] = useState<string>(props.section?.title);
  const [description, setDescription] = useState<string>(props.section?.description);
  const [sortOrder, setSortOrder] = useState<number>(props.section?.sortOrder);

  const handleSaveClick = (): void => {
    //TODO: validate, then save.
    const section: Section = {
      sectionId: props.section?.sectionId ?? 0,
      title: title,
      description: description,
      sortOrder: +sortOrder!,
    };

    if (section.sectionId === 0) {
      createSection(section);
    } else {
      updateSection(section);
    }
  };

  const createSection = (section: Section): void => {
    let options: any = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(section),
    };
    fetch(`${apiBaseUrl}/sections/category`, options)
      .then((response) => console.log(response))
      .then(
        () => props.onSave(),
        (error) => console.log(error)
      );
  };

  const updateSection = (section: Section): void => {
    let options: any = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(section),
    };
    fetch(`${apiBaseUrl}/sections/${section.sectionId}`, options)
      .then((response) => console.log(response))
      .then(
        () => props.onSave(),
        (error) => console.log(error)
      );
  };

  return (
    <Container>
      <b>Section</b>
      <br />
      <br />
      Title*:
      <br />
      <InputText
        type="text"
        value={title}
        style={{ width: "300px" }}
        onChange={(e) => setTitle(e.target.value)}
      ></InputText>
      <br />
      <br />
      Description*:
      <br />
      <InputTextarea
        rows={5}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: "100%" }}
      />
      <br />
      <br />
      Sort Order*:
      <br />
      <InputText
        type="number"
        value={sortOrder}
        style={{ width: "100px" }}
        onChange={(e) => setSortOrder(+e.target.value)}
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

export default SectionEdit;
