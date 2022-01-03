import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import styled from "styled-components";
import Button from "../../components/Button";
import { apiBaseUrl } from "../../constants";
import { AssetSection } from "../../models/AssetSection";
import { SectionCategory } from "../../models/SectionCategory";
import { InputText } from "primereact/inputtext";

const Container = styled.div`
  margin: 10px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface SectionEditProps {
  assetId: number;
  section: AssetSection;
  onSave: () => void;
  onCancel: () => void;
}

const SectionEdit: React.FC<SectionEditProps> = (props: SectionEditProps) => {
  console.log("Evaluating SectionEdit...");
  console.log(props);
  const [sectionCategories, setSectionCategories] = useState<SectionCategory[]>([]);
  const [selectedSectionCategory, setSelectedSectionCategory] = useState<SectionCategory>(
    props.section?.sectionCategory!
  );
  const [sectionBody, setSectionBody] = useState<string>(props.section?.body);
  const [rating, setRating] = useState<number | undefined>(props.section?.rating ?? undefined);

  const handleSaveClick = (): void => {
    //TODO: validate, then save.
    let section: AssetSection = {
      assetSectionId: props.section?.assetSectionId ?? 0,
      assetId: props.assetId,
      sectionCategoryId: selectedSectionCategory!.sectionCategoryId,
      body: sectionBody,
      rating: rating,
    };

    if (section.assetSectionId === 0) {
      createSection(section);
    } else {
      updateSection(section);
    }
  };

  const createSection = (section: AssetSection): void => {
    let options: any = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(section),
    };
    fetch(`${apiBaseUrl}/sections`, options)
      .then((response) => console.log(response))
      .then(
        () => props.onSave(),
        (error) => console.log(error)
      );
  };

  const updateSection = (section: AssetSection): void => {
    let options: any = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(section),
    };
    fetch(`${apiBaseUrl}/sections/${section.assetSectionId}`, options)
      .then((response) => console.log(response))
      .then(
        () => props.onSave(),
        (error) => console.log(error)
      );
  };

  const getSectionCategories = (): void => {
    fetch(`${apiBaseUrl}/sections/categories`)
      .then((response) => response.json())
      .then(
        (categories: SectionCategory[]) => setSectionCategories(categories),
        (error) => console.log(error)
      );
  };

  useEffect(() => {
    getSectionCategories();
  }, []);

  return (
    <Container>
      Title:*
      <br />
      <Dropdown
        value={selectedSectionCategory}
        options={sectionCategories}
        optionLabel="title"
        onChange={(e: any) => setSelectedSectionCategory(e.value)}
        placeholder="Select a section"
        style={{ width: "100%" }}
      />
      <br />
      <br />
      Body:*
      <br />
      <InputTextarea
        rows={10}
        value={sectionBody}
        onChange={(e) => setSectionBody(e.target.value)}
        style={{ width: "100%" }}
      />
      <br />
      <br />
      Rating:*
      <br />
      <InputText
        type="number"
        value={rating}
        style={{ width: "80px" }}
        onChange={(e) => setRating(+e.target.value)}
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
