import styled, { css, keyframes } from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  max-width: 700px;
  background-color: #fff;
  border-radius: 4px;
  padding: 16px 32px 32px;
  margin: 80px auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`;

export const BackButton = styled(Link)`
  background-color: transparent;
  border: none;
  color: #808080;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  width: fit-content;
  padding: 8px;
  transition: 0.2s;

  &:hover {
    /* opacity: 0.8; */
    color: #000;
  }
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > img {
    width: 200px;
    border-radius: 20%;
    margin: 20px 0;
  }

  h1 {
    font-size: 32px;
    color: #0d2636;
  }

  p {
    margin-top: 8px;
    text-align: center;
    line-height: 1.4;
    max-width: 400px;
  }
`;

const animate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  ${css`
    svg {
      animation: ${animate} 2s linear infinite;
    }
  `}
`;

export const IssuesList = styled.ul`
  margin-top: 32px;
  list-style: none;

  & > li {
    display: flex;
    padding: 16px 8px;

    & > img {
      max-width: 48px;
      border-radius: 50%;
    }

    & > div {
      flex: 1;
      margin-left: 12px;

      & > a {
        font-size: 15px;
        font-weight: bold;
        text-decoration: none;
        color: #222;
        transition: 0.2s;

        &:hover {
          color: #0071db;
        }
      }

      & > span {
        background-color: #222;
        color: #fff;
        border-radius: 4px;
        font-size: 12px;
        font-weight: bold;
        padding: 4px 6px;
        margin: 8px;
      }

      & > p {
        margin-top: 8px;
        font-size: 14px;
        color: #000;
      }
    }

    & + li {
      border-top: 1px solid #eee;
    }
  }
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;

  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f9f9f9;
    border-radius: 4px;
    border: 1px solid #ddd;
    transition: all 0.2s;

    &:hover {
      box-shadow: 0 2px 5px #eee;
    }

    &:disabled {
      opacity: .5;
      cursor: not-allowed;
    }
  }

  & > span {
    font-size: 15px;
    font-weight: bold;
  }
`;
