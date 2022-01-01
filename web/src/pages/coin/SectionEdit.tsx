import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import { apiBaseUrl } from "../../constants";
import { AssetSection } from "../../models/AssetSection";

const Container = styled.div`
  margin: 10px;
`;

interface SectionEditProps {
  section: AssetSection;
  onCancel: () => void;
}

const SectionEdit: React.FC<SectionEditProps> = (props: SectionEditProps) => {
  const [sectionTitle, setSectionTitle] = useState<string>(props.section.title);
  const [sectionBody, setSectionBody] = useState<string>(props.section.body);

  const saveSection = () => {
    let section: AssetSection = {
      assetSectionId: props.section.assetSectionId,
      title: sectionTitle,
      body: sectionBody,
      sortOrder: 1, //TODO
    };
    console.log("saving section...");
    let options: any = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(section),
    };
    // fetch(`${apiBaseUrl}/sections/${section.assetSectionId}`, options)
    fetch(`${apiBaseUrl}/sections`, options)
      .then((response) => response.json())
      .then(
        () => console.log("save completed"),
        (error) => console.log(error)
      );
  };

  return (
    <Container>
      <InputText value={sectionTitle} onChange={(e) => setSectionTitle(e.target.value)} />
      <br />
      <br />
      <InputTextarea
        rows={5}
        //cols={30}
        value={sectionBody}
        onChange={(e) => setSectionBody(e.target.value)}
        style={{ width: "100%" }}
      />
      <br />
      <br />
      <Button onClick={saveSection}>Save</Button>
      &nbsp;
      <Button onClick={props.onCancel}>Cancel</Button>
    </Container>
  );
};

export default SectionEdit;
