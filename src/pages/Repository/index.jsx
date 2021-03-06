import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BackButton,
  Container,
  IssuesList,
  Loading,
  Owner,
  Pagination,
  TypeIssues,
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
  const [typeIssues, setTypeIssues] = useState("open");

  useEffect(() => {
    async function load() {
      const [repoData, issuesData] = await Promise.all([
        api.get(`/repos/${repositorio}`),
        api.get(`/repos/${repositorio}/issues`, {
          params: {
            state: typeIssues,
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
  }, [repositorio, typeIssues]);

  useEffect(() => {
    async function loadIssue() {
      const response = await api.get(`/repos/${repositorio}/issues`, {
        params: {
          state: typeIssues,
          page: page,
          per_page: 5,
        },
      });

      setRepoIssues(response.data);
    }

    loadIssue();
  }, [page, repositorio, typeIssues]);

  const handleFilter = type => {
    switch (type) {
      case "open":
        return setTypeIssues("open");
      case "closed":
        return setTypeIssues("closed");
      case "all":
        return setTypeIssues("all");
      default:
        return "";
    }
  };

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

      {repoIssues.length !== 0 && (
        <>
          <TypeIssues>
            <h2>Issues:</h2>
            <div>
              <button
                className={typeIssues === "open" ? "selected" : ""}
                onClick={() => handleFilter("open")}
              >
                Open
              </button>
              <button
                className={typeIssues === "closed" ? "selected" : ""}
                onClick={() => handleFilter("closed")}
              >
                Closed
              </button>
              <button
                className={typeIssues === "all" ? "selected" : ""}
                onClick={() => handleFilter("all")}
              >
                All
              </button>
            </div>
          </TypeIssues>

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
            <span>P??gina: {page}</span>
            <button onClick={() => setPage(page + 1)}>
              <RiArrowRightSLine size={28} />
            </button>
          </Pagination>
        </>
      )}
    </Container>
  );
}

export default Repository;
