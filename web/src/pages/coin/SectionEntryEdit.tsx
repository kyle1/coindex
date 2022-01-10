import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";
import styled from "styled-components";
import { apiBaseUrl } from "../../constants";
import { SectionEntry } from "../../models/SectionEntry";
import { Section } from "../../models/Section";
import Button from "../../components/Button";

const Container = styled.div`
  margin: 10px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface SectionEntryEditProps {
  assetId: number;
  entry: SectionEntry;
  onSave: () => void;
  onCancel: () => void;
}

const SectionEntryEdit: React.FC<SectionEntryEditProps> = (props: SectionEntryEditProps) => {
  console.log("Evaluating SectionEdit...");
  console.log(props);
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSection, setSelectedSection] = useState<Section>(props.entry?.section!);
  const [entryBody, setEntryBody] = useState<any>(props.entry?.body);
  const [rating, setRating] = useState<number | undefined>(props.entry?.rating);

  const getSections = (): void => {
    fetch(`${apiBaseUrl}/sections`)
      .then((response) => response.json())
      .then(
        (sections: Section[]) => setSections(sections),
        (error) => console.log(error)
      );
  };

  const createSectionEntry = (section: SectionEntry): void => {
    let options: any = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(section),
    };
    fetch(`${apiBaseUrl}/sections/entries`, options)
      .then((response) => console.log(response))
      .then(
        () => props.onSave(),
        (error) => console.log(error)
      );
  };

  const updateSectionEntry = (entry: SectionEntry): void => {
    let options: any = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry),
    };
    fetch(`${apiBaseUrl}/sections/entries/${entry.sectionEntryId}`, options)
      .then((response) => console.log(response))
      .then(
        () => props.onSave(),
        (error) => console.log(error)
      );
  };

  const handleSaveClick = (): void => {
    //TODO: validate, then save.
    let entry: SectionEntry = {
      sectionEntryId: props.entry?.sectionEntryId ?? 0,
      assetId: props.assetId,
      sectionId: selectedSection!.sectionId,
      body: entryBody,
      rating: rating,
    };

    if (entry.sectionEntryId === 0) {
      createSectionEntry(entry);
    } else {
      updateSectionEntry(entry);
    }
  };

  useEffect(() => getSections(), []);

  return (
    <Container>
      <Dropdown
        value={selectedSection}
        options={sections}
        optionLabel="title"
        onChange={(e: any) => setSelectedSection(e.value)}
        placeholder="Select a section"
        style={{ width: "100%" }}
        disabled={(props.entry?.sectionEntryId ?? 0) !== 0}
      />
      <br />
      <br />
      <Editor
        style={{ height: "320px" }}
        value={entryBody}
        onTextChange={(e) => setEntryBody(e.htmlValue)}
      />
      <br />
      Rating:
      <span style={{ paddingLeft: "10px" }}>
        {[...Array(5)].map((e, i) => (
          <i
            key={i}
            className={(!rating || i >= rating! ? "far" : "fas") + " fa-star"}
            style={{ color: "#FFDF00", fontSize: "20px", cursor: "pointer", paddingRight: "5px" }}
            onClick={() => setRating(i + 1)}
          />
        ))}
      </span>
      <br />
      <br />
      <Footer>
        <Button onClick={props.onCancel}>Cancel</Button>
        <Button onClick={() => handleSaveClick()}>Save</Button>
      </Footer>
    </Container>
  );
};

export default SectionEntryEdit;
