import React, { useEffect, useState } from "react";
import { Button as PrimeButton } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import styled from "styled-components";
import SectionEdit from "./SectionEdit";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import { apiBaseUrl } from "../../../constants";
import { Section } from "../../../models/Section";

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

interface SectionsMaintenaceProps {}

const SectionsMaintenace: React.FC<SectionsMaintenaceProps> = (props: SectionsMaintenaceProps) => {
  const [showSectionEdit, setShowSectionEdit] = useState<boolean>(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSection, setSelectedSection] = useState<Section | null>();

  const getSections = (): void => {
    fetch(`${apiBaseUrl}/sections`)
      .then((response) => response.json())
      .then(
        (categories: Section[]) => setSections(categories),
        (error) => console.log(error)
      );
  };

  const deleteSection = (id: number): void => {
    let options: any = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: null,
    };
    fetch(`${apiBaseUrl}/sections/${id}`, options)
      .then((response) => console.log(response))
      .then(
        () => getSections(),
        (error) => console.log(error)
      );
  };

  const handleNewClick = (): void => {
    setSelectedSection(null);
    setShowSectionEdit(true);
  };
  const handleEditClick = (section: Section): void => {
    setSelectedSection(section);
    setShowSectionEdit(true);
  };

  const handleSectionSave = (): void => {
    setShowSectionEdit(false);
    getSections();
  };

  const header: JSX.Element = (
    <Heading>
      Sections
      <Button onClick={() => handleNewClick()}>
        <i className="fas fa-plus" />
      </Button>
    </Heading>
  );

  // const editTemplate = (section: Section): JSX.Element => (
  //   <Button onClick={() => handleEditClick(section)}>
  //     <i className="fas fa-pencil-alt" />
  //   </Button>
  // );

  // const deleteTemplate = (section: Section): JSX.Element => (
  //   <Button onClick={() => console.log("TODO: delete")}>
  //     <i className="fas fa-trash" />
  //   </Button>
  // );

  const actionBodyTemplate = (section: Section): JSX.Element => (
    <>
      <PrimeButton
        icon="pi pi-pencil"
        className="p-button-rounded p-button-success"
        style={{ height: "30px", width: "30px", marginRight: "15px" }}
        onClick={() => handleEditClick(section)}
      />
      <PrimeButton
        icon="pi pi-trash"
        className="p-button-rounded p-button-warning"
        style={{ height: "30px", width: "30px" }}
        onClick={() => deleteSection(section.sectionId)}
      />
    </>
  );

  useEffect(() => getSections(), []);

  return (
    <>
      {showSectionEdit && (
        <Modal onConfirm={() => {}} onClose={() => setShowSectionEdit(false)}>
          <SectionEdit
            section={selectedSection!}
            onSave={handleSectionSave}
            onCancel={() => setShowSectionEdit(false)}
          />
        </Modal>
      )}
      {!showSectionEdit && (
        <Container>
          <DataTable
            value={sections}
            //size="small"
            className="p-datatable-sm editable-cells-table"
            header={header}
            editMode="cell"
          >
            <Column field="title" header="Title" headerStyle={{ width: "300px" }} sortable />
            <Column
              field="description"
              header="Description"
              headerStyle={{ width: "1200px" }}
              sortable
            />
            <Column
              field="sortOrder"
              header="Sort Order"
              //headerStyle={{ width: "300px" }}
              sortable
            />
            {/* <Column header="Edit" body={editTemplate} sortable />
            <Column header="Delete" body={deleteTemplate} sortable /> */}
            <Column header="" body={actionBodyTemplate} sortable />
          </DataTable>
        </Container>
      )}
    </>
  );
};

export default SectionsMaintenace;
