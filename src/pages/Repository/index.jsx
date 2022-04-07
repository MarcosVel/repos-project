import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Loading, Owner } from "./styles";
import api from "../../services/api";
import { FaSpinner } from "react-icons/fa";

function Repository() {
  const { repositorio } = useParams();
  const [repo, setRepo] = useState({});
  const [repoIssues, setRepoIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [repoData, issuesData] = await Promise.all([
        api.get(`/repos/${repositorio}`),
        api.get(`/repos/${repositorio}/issues`, {
          params: {
            state: "open",
            per_page: 5,
          },
        }),
      ]);
      // console.log(repoData.data);
      // console.log(issuesData.data);
      setRepo(repoData.data);
      setRepoIssues(issuesData.data);
      setLoading(false);
    }

    load();
  }, [repositorio]);

  console.log(repo);

  if (loading) {
    return (
      <Loading>
        <FaSpinner color="#fff" size={48} />
      </Loading>
    );
  }

  return (
    <Container style={{ color: "white" }}>
      <Owner>
        <img src={repo?.owner?.avatar_url} alt={repo?.owner?.login} />
        <h1>{repo?.name}</h1>
        <p>{repo?.description}</p>
      </Owner>
    </Container>
  );
}

export default Repository;
