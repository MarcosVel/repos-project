import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container } from "./styles";
import api from "../../services/api";

function Repository() {
  const { repositorio } = useParams();

  useEffect(() => {
    async function load() {
      const [repoData, issuesData] = await Promise.all([
        api.get(`/repos/${repositorio}`),
        api.get(`/repos/${repositorio}/issues`)
      ]);
    }

    load();
  }, [])

  return (
      <Container style={{ color: "white" }}>
        {repositorio}
      </Container>
  );
}

export default Repository;
