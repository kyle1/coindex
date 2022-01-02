import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import { apiBaseUrl } from "../../../constants";
import { SectionCategory } from "../../../models/SectionCategory";
import CreateSection from "./CreateSection";

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
  const [showCreateCategory, setShowCreateCategory] = useState<boolean>(false);
  const [sectionCategories, setSectionCategories] = useState<SectionCategory[]>([]);

  const getSectionCategories = () => {
    console.log(`getting section categories...`);
    fetch(`${apiBaseUrl}/sections/categories`)
      .then((response) => response.json())
      .then(
        (categories: SectionCategory[]) => setSectionCategories(categories),
        (error) => console.log(error)
      );
  };

  const header = (
    <Heading>
      Section Categories
      <Button onClick={() => setShowCreateCategory(true)}>New</Button>
    </Heading>
  );

  useEffect(() => getSectionCategories(), []);

  return (
    <>
      {showCreateCategory && (
        <Modal onConfirm={() => {}} onClose={() => setShowCreateCategory(false)}>
          <CreateSection />
        </Modal>
      )}
      {!showCreateCategory && (
        <Container>
          <DataTable
            value={sectionCategories}
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
          </DataTable>
        </Container>
      )}
    </>
  );
};

export default SectionCategories;
