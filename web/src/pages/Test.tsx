import React, { useState } from "react";
import styled from "styled-components";
import { Editor } from "primereact/editor";

const Container = styled.div`
  margin: 50px;
`;

interface TestProps {}

const Test: React.FC<TestProps> = (props: TestProps) => {
  const [text, setText] = useState<any>("");
  return <Container>test stuff here</Container>;
};

export default Test;
