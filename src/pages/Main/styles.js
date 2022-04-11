import styled, { keyframes, css } from "styled-components";

export const Container = styled.div`
  max-width: 700px;
  background-color: #fff;
  border-radius: 4px;
  padding: 32px;
  margin: 80px auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

  h1 {
    display: flex;
    align-items: center;
    font-size: 20px;

    svg {
      margin-right: 8px;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  margin-top: 30px;

  input {
    flex: 1;
    border: 1px solid ${props => (props.error ? '#ff0000' : '#ddd')};
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 17px;
    margin-right: 8px;
  }
`;

// Animation button
const animate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SubmitBtn = styled.button.attrs(props => ({
  type: "submit",
  disabled: props.loading,
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0d2636;
  border: 0;
  border-radius: 4px;
  padding: 10px;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${props => props.loading && 
    css`
      svg {
        animation: ${animate} 2s linear infinite;
      }
    `
  }
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 16px;

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;

    & + li {
      border-top: 1px solid #eee;
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;

  button {
    display: flex;
    align-items: center;
    background-color: transparent;
    border: none;
    color: red;
  }

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: blue;
  }
`;