import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "./styles";
import api from "../../services/api";

function Repository() {
  const { repositorio } = useParams();
  const [ repo, setRepo ] = useState({});
  const [ repoIssues, setRepoIssues ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    async function load() {
      const [repoData, issuesData] = await Promise.all([
        api.get(`/repos/${repositorio}`),
        api.get(`/repos/${repositorio}/issues`, {
          params: {
            state: "open",
            per_page: 5
          }
        })
      ]);
      // console.log(repoData.data);
      // console.log(issuesData.data);
      setRepo(repoData.data);
      setRepoIssues(issuesData.data);
      setLoading(false);
    }
    
    load();
  }, [repositorio]);

  return (
      <Container style={{ color: "white" }}>
        {repositorio}
      </Container>
  );
}

export default Repository;
