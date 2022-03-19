import React, { useCallback, useState } from "react";
import { Container, Form, SubmitBtn } from "./styles";
import { FaGithub, FaPlus } from "react-icons/fa";
import api from "../../services/api";

function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState([]);

  const handleInputChange = e => {
    setNewRepo(e.target.value);
  };

  const handleSubmit = useCallback(e => {
      e.preventDefault();

      async function submit() {
        const response = await api.get(`repos/${newRepo}`);

        const data = {
          name: response.data.full_name,
        };

        setRepositorios([...repositorios, data]);
      }

      submit();
    }, [newRepo, repositorios]);

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositórios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar repositórios"
          value={newRepo}
          onChange={e => handleInputChange(e)}
        />

        <SubmitBtn>
          <FaPlus color="#fff" size={16} />
        </SubmitBtn>
      </Form>
    </Container>
  );
}

export default Main;
