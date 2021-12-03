import styled from "styled-components";

const Input = styled.input`
  padding-left: 5px;
  /* background-color: rgb(34, 37, 49); */
  background-color: inherit;
  border: 2px solid rgb(34, 37, 49);
  /* border-radius: 8px; */
  box-shadow: none;
  color: white;
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  height: 30px;
  line-height: 1;
  outline: none;
  padding: 5px;
  /* width: 100%; */
  width: ${(props) => props.width || "100%"};
  &:focus {
    border-color: #64b5f6;
  }
  /* &:hover {
    border-color: #64b5f6;
  } */
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Input2 = styled.input`
  padding-left: 5px;
  /* background-color: rgb(34, 37, 49); */
  background-color: inherit;
  border: 2px solid rgb(34, 37, 49);
  border-radius: 5px;
  box-shadow: none;
  color: white;
  display: inline-block;
  font-size: 1rem;
  /* font-weight: 500; */
  height: 30px;
  line-height: 1;
  outline: none;
  padding: 5px;
  margin: "auto";
  width: ${(props) => props.width || "100%"};
  &:focus {
    border-color: #64b5f6;
  }
  /* &:hover {
    border-color: #64b5f6;
  } */
`;

export default Input;
