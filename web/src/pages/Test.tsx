import React, { useState } from "react";
import styled from "styled-components";
import { Editor } from "primereact/editor";

const Container = styled.div`
  margin: 50px;
`;

interface TestProps {}

const Test: React.FC<TestProps> = (props: TestProps) => {
  const [text, setText] = useState<any>("");
  return (
    <Container>
      {/* <Editor style={{ height: "320px" }} value={text} onTextChange={(e) => setText(e.htmlValue)} /> */}
      <Editor style={{ height: "320px" }} value={text} onTextChange={(e) => setText(e.htmlValue)} />
      <button onClick={() => console.log(text)} />
      <br />
      <br />
      <div dangerouslySetInnerHTML={{ __html: text }}></div>
      <br />
      <br />
    </Container>
  );
};

export default Test;
