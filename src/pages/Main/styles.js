import styled from 'styled-components';

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

`

export const Form = styled.form`
  display: flex;
  margin-top: 30px;

  input {
    flex: 1;
    border: 1px solid #ddd;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 17px;
  }
`

export const SubmitBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0d2636;
  border: 0;
  border-radius: 4px;
  padding: 10px;
`