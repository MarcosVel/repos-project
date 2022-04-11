import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BackButton,
  Container,
  IssuesList,
  Loading,
  Owner,
  Pagination,
} from "./styles";
import api from "../../services/api";
import { FaSpinner } from "react-icons/fa";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

function Repository() {
  const { repositorio } = useParams();
  const [repo, setRepo] = useState({});
  const [repoIssues, setRepoIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

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

  useEffect(() => {
    async function loadIssue() {
      const response = await api.get(`/repos/${repositorio}/issues`, {
        params: {
          state: "open",
          page: page,
          per_page: 5,
        },
      });

      setRepoIssues(response.data);
    }

    loadIssue();
  }, [page, repositorio]);

  if (loading) {
    return (
      <Loading>
        <FaSpinner color="#fff" size={48} />
      </Loading>
    );
  }

  return (
    <Container>
      <BackButton to="/">
        <RiArrowLeftSLine size={28} />
        Voltar
      </BackButton>
      <Owner>
        <img src={repo?.owner?.avatar_url} alt={repo?.owner?.login} />
        <h1>{repo?.name}</h1>
        <p>{repo?.description}</p>
      </Owner>

      <IssuesList>
        {repoIssues.map(issue => (
          <li key={issue?.id}>
            <img src={issue?.user?.avatar_url} alt={issue?.user?.login} />
            <div>
              <a
                href={issue?.html_url}
                rel="noopener noreferrer"
                target="_blank"
              >
                {issue?.title}
              </a>
              {issue?.labels?.map(label => (
                <span key={label?.id}>{label?.name}</span>
              ))}
              <p>{issue?.user?.login}</p>
            </div>
          </li>
        ))}
      </IssuesList>

      <Pagination>
        <button disabled={page < 2} onClick={() => setPage(page - 1)}>
          <RiArrowLeftSLine size={28} />
        </button>
        <span>Página: {page}</span>
        <button onClick={() => setPage(page + 1)}>
          <RiArrowRightSLine size={28} />
        </button>
      </Pagination>
    </Container>
  );
}

export default Repository;
