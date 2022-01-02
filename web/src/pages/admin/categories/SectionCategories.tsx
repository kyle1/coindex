import React, { useEffect, useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import styled from "styled-components";
import SectionEdit from "./SectionEdit";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import { apiBaseUrl } from "../../../constants";
import { SectionCategory } from "../../../models/SectionCategory";

const Container = styled.div`
  margin: 10px;
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 26px;
`;

interface SectionCategoriesProps {}

const SectionCategories: React.FC<SectionCategoriesProps> = (props: SectionCategoriesProps) => {
  const [showSectionEdit, setShowSectionEdit] = useState<boolean>(false);
  const [sectionCategories, setSectionCategories] = useState<SectionCategory[]>([]);
  const [selectedSection, setSelectedSection] = useState<SectionCategory | null>();

  const getSectionCategories = (): void => {
    fetch(`${apiBaseUrl}/sections/categories`)
      .then((response) => response.json())
      .then(
        (categories: SectionCategory[]) => setSectionCategories(categories),
        (error) => console.log(error)
      );
  };

  const handleNewClick = (): void => {
    setSelectedSection(null);
    setShowSectionEdit(true);
  };
  const handleEditClick = (section: SectionCategory): void => {
    setSelectedSection(section);
    setShowSectionEdit(true);
  };

  const handleCategorySave = (): void => {
    setShowSectionEdit(false);
    getSectionCategories();
  };

  const header: JSX.Element = (
    <Heading>
      Section Categories
      <Button onClick={() => handleNewClick()}>
        <i className="fas fa-plus" />
      </Button>
    </Heading>
  );

  const editTemplate = (section: SectionCategory): JSX.Element => (
    <Button onClick={() => handleEditClick(section)}>
      <i className="fas fa-pencil-alt" />
    </Button>
  );

  const deleteTemplate = (section: SectionCategory): JSX.Element => (
    <Button onClick={() => console.log("TODO: delete")}>
      <i className="fas fa-trash" />
    </Button>
  );

  useEffect(() => getSectionCategories(), []);

  return (
    <>
      {showSectionEdit && (
        <Modal onConfirm={() => {}} onClose={() => setShowSectionEdit(false)}>
          <SectionEdit
            section={selectedSection!}
            onSave={handleCategorySave}
            onCancel={() => setShowSectionEdit(false)}
          />
        </Modal>
      )}
      {!showSectionEdit && (
        <Container>
          <DataTable
            value={sectionCategories}
            //size="small"
            className="p-datatable-sm editable-cells-table"
            header={header}
            editMode="cell"
          >
            <Column field="title" header="Title" headerStyle={{ width: "200px" }} sortable />
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
            <Column header="Edit" body={editTemplate} sortable />
            <Column header="Delete" body={deleteTemplate} sortable />
          </DataTable>
        </Container>
      )}
    </>
  );
};

export default SectionCategories;
