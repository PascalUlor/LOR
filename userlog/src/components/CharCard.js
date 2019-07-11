import React from "react";
import styled from "styled-components";

const CharCard = props => {
  const { chars, DeleteUser, GetCharsById } = props;
  return (
    <div>
      {chars.map(char => {
        return (
          <Card key={char.id}>
            <p>{char.name}</p>
            <p>{char.bio}</p>
            <span>
              <button onClick={() => GetCharsById(char.id)}>Edit</button>
            </span>
            <span>
              <button onClick={() => DeleteUser(char.id)}>Delete</button>
            </span>
          </Card>
        );
      })}
    </div>
  );
};

const Card = styled.div`
  max-width: 350px;
  height: 6rem;
  background-color: rgba(65, 66, 46, 0.8);
  /* #41422e */
  margin: 1rem auto;
  line-height: 2rem;
  color: #9399a4;
`;

export default CharCard;
