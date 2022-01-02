import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../../components/Button";
import Input from "../../../components/Input";

const Container = styled.div`
  margin: 10px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface CreateTagProps {}

const CreateTag: React.FC<CreateTagProps> = (props: CreateTagProps) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<number>();

  const handleSaveClick = () => {
    //TODO: validate, then save.
    console.log("TODO");
  };

  return (
    <Container>
      <b>Section</b>
      <br />
      <br />
      Title*:
      <br />
      <Input
        type="text"
        value={title}
        style={{ width: "300px" }}
        onChange={(e) => setTitle(e.target.value)}
      ></Input>
      <br />
      <br />
      Description*:
      <br />
      <Input
        type="text"
        value={description}
        style={{ width: "300px" }}
        onChange={(e) => setDescription(e.target.value)}
      ></Input>
      <br />
      <br />
      Sort Order*:
      <br />
      <Input
        type="number"
        value={sortOrder}
        style={{ width: "300px" }}
        onChange={(e) => setSortOrder(+e.target.value)}
      ></Input>
      <br />
      <br />
      <Footer>
        <Button>Cancel</Button>
        <Button onClick={() => handleSaveClick()}>Save</Button>
      </Footer>
    </Container>
  );
};

export default CreateTag;
