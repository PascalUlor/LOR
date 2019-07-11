import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import CharCard from "./components/CharCard";
import CharForm from "./components/CharForm";

const baseUrl = `http://localhost:3000/api/users`;

function App() {
  const [chars, setChars] = useState([]);
  const [currentCharId, setCurrentCharId] = useState(null);
  const [newChar, setNewChar] = useState({
    name: "",
    bio: ""
  });

  const addChar = event => {
    let CharDeet = {
      name: newChar.name,
      bio: newChar.bio
    };
    axios
      .post(`${baseUrl}`, CharDeet)
      .then(res => {})
      .catch(err => console.log(err));
    setNewChar({
      name: "",
      bio: ""
    });
  };

  const handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setNewChar(newChar => ({ ...newChar, [name]: value }));
  };

  const FetchChars = () => {
    axios
      .get(`${baseUrl}`)
      .then(res => {
        setChars(res.data);
      })
      .catch(err => {
        return err.statusText;
      });
  };

  const GetCharsById = async id => {
    await axios
      .get(`${baseUrl}/${id}`)
      .then(res => {
        setCurrentCharId(res.data.id);
        const charEdit = chars.find(char => char.id === res.data.id);
        if (charEdit) {
          setNewChar({
            name: charEdit.name,
            bio: charEdit.bio
          });
        }
      })
      .catch(err => {
        return err.statusText;
      });
  };

  const UpdateChar = () => {
    axios
      .put(`${baseUrl}/${currentCharId}`, newChar)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
    FetchChars();
  };
  const DeleteUser = id => {
    axios
      .delete(`${baseUrl}/${id}`)
      .then(res => {
        console.log("-----Working", res.data);
        FetchChars();
      })
      .catch(err => {
        console.log("---------", err);
      });
  };

  useEffect(FetchChars, []);

  return (
    <>
      <Header> Lord Of The Rings</Header>
      <Main>
        <CharCard
          chars={chars}
          DeleteUser={DeleteUser}
          GetCharsById={GetCharsById}
        />
        <CharForm
          chars={chars}
          UpdateChar={UpdateChar}
          addChar={addChar}
          handleInputChange={handleInputChange}
          newChar={newChar}
          IsEdit={currentCharId}
        />
      </Main>
    </>
  );
}

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to top, rgba(80, 68, 18, 0.6) 10%, transparent),
    url(https://i.pinimg.com/originals/2e/65/68/2e656825f9bf5c52bc3febdac8f43945.jpg)
      center/cover no-repeat border-box,
    skyblue;
  width: 100vw;
  min-height: 100vh;
  position: relative;
  text-align: center;
`;

const Header = styled.h1`
  @import url("https://fonts.googleapis.com/css?family=Petrona&display=swap");
  font-family: "Petrona", serif;
  text-align: center;
  margin: 0 auto;
  font-size: 2rem;
`;

export default App;
