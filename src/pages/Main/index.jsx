import React, { useCallback, useEffect, useState } from "react";
import { Actions, Container, Form, List, SubmitBtn } from "./styles";
import { FaGithub, FaPlus, FaSpinner, FaEye, FaTrash } from "react-icons/fa";
import api from "../../services/api";
import { Link } from "react-router-dom";

function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertInput, setAlertInput] = useState(null);

  const handleInputChange = e => {
    setNewRepo(e.target.value);
    setAlertInput(null);
  };

  const handleSubmit = useCallback(e => {
    e.preventDefault();

    async function submit() {
      setLoading(true);
      try {
        if (newRepo === '') {
          throw new Error('Indique um repositório');
        }

        const response = await api.get(`repos/${newRepo}`);

        const hasRepo = repositorios.find(repo => repo.name === newRepo);
        
        if (hasRepo) {
          throw new Error('Repositório duplicado');
        }

        const data = {
          name: response.data.full_name,
        };

        setRepositorios([...repositorios, data]);
      } catch(err) {
        setAlertInput(true);
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

  // Searching
  useEffect(() => {
    const repoStorage = localStorage.getItem('repos');

    if (repoStorage) {
      setRepositorios(JSON.parse(repoStorage));
    }
  }, []);

  // Saving
  useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(repositorios));
  }, [repositorios]);

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositórios
      </h1>

      <Form onSubmit={handleSubmit} error={alertInput}>
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
                <FaTrash size={16} />
              </button>
              {/* encodeURIComponent para poder passar mais de uma / sem ser uma rota */}
              <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                <FaEye size={20} />
              </Link>
            </Actions>
          </li>
        ))}
      </List>
    </Container>
  );
}

export default Main;
