import React, { useCallback, useState } from "react";
import { Actions, Container, Form, List, SubmitBtn } from "./styles";
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from "react-icons/fa";
import api from "../../services/api";
import { Link } from "react-router-dom";

function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = e => {
    setNewRepo(e.target.value);
  };

  const handleSubmit = useCallback(e => {
      e.preventDefault();

      async function submit() {
        setLoading(true);
        try {
          const response = await api.get(`repos/${newRepo}`);

          const data = {
            name: response.data.full_name,
          };

          setRepositorios([...repositorios, data]);
        } catch(err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      }

      submit();
    }, [newRepo, repositorios]);

    const handleDelete = useCallback(name => {
      const find = repositorios.filter(r => r.name !== name)
      setRepositorios(find);
    }, [repositorios]);

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

        <SubmitBtn loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#fff" size={16} />
          ) : (
            <FaPlus color="#fff" size={16} />
          )}
        </SubmitBtn>
      </Form>

      <List>
        {repositorios.map(repo => (
          <li key={repo.name}>
            <span>{repo.name}</span>
            <Actions>
              <button onClick={() => handleDelete(repo.name)}>
                <FaTrash size={18} />
              </button>
              <Link to=''>
                <FaBars size={20} />
              </Link>
            </Actions>
          </li>
        ))}
      </List>
    </Container>
  );
}

export default Main;
