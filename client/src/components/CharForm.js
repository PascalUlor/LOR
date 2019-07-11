import React from "react";
import styled from "styled-components";

const CharForm = props => {
  const { UpdateChar, addChar, handleInputChange, newChar, IsEdit } = props;
  const Method = IsEdit ? UpdateChar : addChar;
  return (
    <Form onSubmit={Method}>
      <input
        type="text"
        placeholder="Enter Name"
        value={newChar.name}
        onChange={handleInputChange}
        name="name"
      />
      <textarea
        type="text"
        placeholder="Enter Bio"
        value={newChar.bio}
        onChange={handleInputChange}
        name="bio"
      />
      <button>Submit</button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 10rem;
  padding: 2rem;
  input {
    height: 2rem;
    width: 10rem;
    border: 1px solid skyblue;
  }
  textarea {
    border: 1px solid skyblue;
    height: 3rem;
    width: 15rem;
  }
  button {
    background-color: skyblue;
    border-radius: 8px;
    width: 5rem;
    height: 2rem;
  }
`;

export default CharForm;
